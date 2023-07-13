import { chromium, Page } from 'playwright'
import { msleep } from '@well-balanced/utils'
import { getCourts, Target } from './courts'

require('dotenv').config()

const PROFILE_PATH = process.env.PROFILE_PATH

const PAGE_TIMEOUT = 30 * 1000 // 30s

async function main() {
    const [target] = process.argv.slice(2)
    if (!['ng', 'yg'].includes(target)) return

    const court = getCourts(target)

    const browser = await chromium.launchPersistentContext(PROFILE_PATH, {
        devtools: process.env.NODE_ENV !== 'production',
    })

    try {
        const promises = court.targets.map(async (target) => {
            if (process.env.NODE_ENV === 'production') {
                // til on hour
                const initial = Math.floor(
                    new Date().getTime() / (1000 * 60 * 60)
                )
                while (
                    initial ===
                    Math.floor(new Date().getTime() / (1000 * 60 * 60))
                ) {
                    await msleep(50)
                }
            }

            const page = await browser.newPage()
            page.setDefaultTimeout(PAGE_TIMEOUT)
            await page.goto(court.url, { waitUntil: 'networkidle' })
            await book(page, target)
            await page.close()
        })
        await Promise.all(promises)
    } catch (error) {
        await browser.close()
    }

    console.log('done ✅')
}

main()

export async function book(page: Page, target: Target) {
    const [name, date, [from, to]] = target
    /**
     * Click tennis court
     */
    await page.waitForSelector('.fvwqf')
    await page.click('.fvwqf')
    await page.click(`text=${name}`)

    /**
     * Pick dates
     */
    await page.waitForSelector(
        '#ct > div > div > div.section_booking > div > div > strong'
    )
    const elem = page.locator(`[data-cal-datetext="${date}"]`)
    await elem.click()

    /**
     * Pick times
     */
    await msleep(300)
    const rows = page.locator('div.time_controler > div > ul > li')
    const count = await rows.count()
    for (let i = 1; i < count; ++i) {
        const t = await rows.nth(i).textContent()
        if (t.match(`${from}`) || t.match(`${to}`)) {
            await page.click(
                `li:nth-child(${i + 1}) > a > span.box_inn_btm.color10`
            )
        }
    }

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

    await msleep(3000)
}
