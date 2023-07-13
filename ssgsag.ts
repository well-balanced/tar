import { msleep } from '@well-balanced/utils'
import { Page, chromium } from 'playwright'
import { addDays, format, parse } from 'date-fns'
require('dotenv').config()

const PROFILE_PATH = process.env.PROFILE_PATH

async function main() {
    let cnt = 0
    while (true) {
        const browser = await chromium.launchPersistentContext(PROFILE_PATH, {
            devtools: process.env.NODE_ENV !== 'production',
            viewport: { width: 1920, height: 1080 },
        })
        try {
            const page = await browser.newPage()
            await ssgsag(page)
        } catch (error) {
            console.log(error)
        }
        await browser.close()
        cnt++
        console.log(`cycle: ${cnt}`)
    }
}

main()

async function ssgsag(page: Page) {
    await page.goto(
        'https://pcmap.place.naver.com/place/1257947832/ticket?from=map&fromPanelNum=1',
        { waitUntil: 'networkidle' }
    )
    await page.waitForSelector('.fvwqf')
    await page.click('.fvwqf')

    const texts = await page
        .locator('ul > li.p6_z6 > div > div > a > span')
        .allTextContents()
    const courtNames = texts.filter((t) => t.includes('코트'))

    for (const name of courtNames) {
        await page.goto(
            'https://pcmap.place.naver.com/place/1257947832/ticket?from=map&fromPanelNum=1',
            { waitUntil: 'networkidle' }
        )
        await page.waitForSelector('.fvwqf')
        await page.click('.fvwqf')

        await book(page, name)
    }
    return
}

async function book(page: Page, name: string) {
    const buffer = 3
    const minDate = format(addDays(new Date(), buffer), 'yyyy-MM-dd')

    await page.click(`text=${name}`)
    await msleep(3000)
    await page.waitForSelector('#calendar > div > strong')

    let unselectable = await page.locator('td.calendar-unselectable').all()
    const calendarMonthDismatched = unselectable.length >= 7 * 5
    if (calendarMonthDismatched) {
        await page
            .locator(`#calendar > div > a.calendar-btn.calendar-btn-next-mon`)
            .click()
        await msleep(1000)
        unselectable = await page.locator('td.calendar-unselectable').all()
        const calendarMonthDismatched = unselectable.length >= 7 * 5
        if (calendarMonthDismatched) {
            await msleep(1000)
            await page
                .locator(
                    `#calendar > div > a.calendar-btn.calendar-btn-prev-mon`
                )
                .click()
            await msleep(1000)
            await page
                .locator(
                    `#calendar > div > a.calendar-btn.calendar-btn-prev-mon`
                )
                .click()
        }
    }

    const [calendarTitle] = await page
        .locator('.calendar-title')
        .allTextContents()

    const txt = await page.locator('table').allTextContents()
    const availableDates = [
        ...new Set(
            txt
                .flatMap((t) => t.match(/\d+/g))
                .map((d) => {
                    return format(
                        parse(
                            `${calendarTitle} ${d}`,
                            'MMMM yyyy d',
                            new Date()
                        ),
                        'yyyy-MM-dd'
                    )
                })
                .filter((d) => d > minDate)
        ),
    ].sort()

    const availableTimes = [
        ['06:00', '07:00'],
        ['20:00', '21:00'],
    ]

    for (const d of availableDates) {
        await msleep(50)
        await page.locator(`[data-cal-datetext="${d}"]`).click()

        const list = await page
            .locator(`div.time_controler > div > ul > li`)
            .all()

        for (const [from, to] of availableTimes) {
            let clickCnt = 0
            for (const item of list) {
                const [text] = await item.allTextContents()
                if (text?.match(from) || text?.match(to)) {
                    const [el] = await item
                        .getByText(text)
                        .locator(`span.color10`)
                        .all()

                    if (el) {
                        await el.click()
                        clickCnt++
                    }
                }
            }

            if (clickCnt !== 2) continue

            /**
             * Open payment tab
             */
            await page.click('text=Next')
            await page.waitForSelector('.bk_btn')

            /**
             * payment page
             */
            const [paymentPage] = await Promise.all([
                page.context().waitForEvent('page'),
                page.click('.bk_btn'),
            ])

            await paymentPage.waitForSelector('.Payment_icon-radio__1IXf1')

            await paymentPage.click('text=일반결제')
            await paymentPage.waitForSelector('.GeneralTab_button-tab__3Gbkp')

            await paymentPage.click('text=나중에 결제')
            await paymentPage.selectOption('div:nth-child(2) > select', '011')
            await paymentPage.click('text=환불정산액 적립')
            await paymentPage.click('.SubmitButton_article__Z2VjB')

            return await msleep(3000)
        }
    }
}
