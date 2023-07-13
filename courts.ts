export type Target = [string, string, [string, string]]

interface TennisCourt {
    url: string
    targets: Target[]
}

export const getCourts = (target: string) => {
    const courtMap: Record<string, TennisCourt> = {
        ng: {
            url: 'https://pcmap.place.naver.com/place/1257947832/ticket?from=map&fromPanelNum=1',
            targets: [
                ['8월 내곡 3번코트(하드)', '2023-08-07', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-14', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-21', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-28', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-02', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-09', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-16', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-23', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-30', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-04', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-11', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-18', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-25', ['06:00', '07:00']],

                ['8월 내곡 3번코트(하드)', '2023-08-07', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-14', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-21', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-28', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-02', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-09', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-16', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-23', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-30', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-04', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-11', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-18', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-25', ['20:00', '21:00']],

                ['8월 내곡 3번코트(하드)', '2023-08-05', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-12', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-19', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-26', ['06:00', '07:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-06', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-13', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-20', ['20:00', '21:00']],
                ['8월 내곡 3번코트(하드)', '2023-08-27', ['20:00', '21:00']],
            ],
        },
        yg: {
            url: 'https://pcmap.place.naver.com/place/18754970/ticket?from=map&fromPanelNum=1',
            targets: [
                // 실내
                ['8월 C코트(실내)', '2023-08-02', ['06:00', '07:00']],
                ['8월 C코트(실내)', '2023-08-09', ['06:00', '07:00']],
                ['8월 C코트(실내)', '2023-08-16', ['06:00', '07:00']],
                ['8월 C코트(실내)', '2023-08-23', ['06:00', '07:00']],
                ['8월 C코트(실내)', '2023-08-30', ['06:00', '07:00']],
                // 실외 새벽
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-01',
                    ['06:00', '07:00'],
                ],
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-08',
                    ['06:00', '07:00'],
                ],
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-15',
                    ['06:00', '07:00'],
                ],
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-22',
                    ['06:00', '07:00'],
                ],
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-29',
                    ['06:00', '07:00'],
                ],
                // 실외 저녁
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-04',
                    ['20:00', '21:00'],
                ],
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-11',
                    ['20:00', '21:00'],
                ],
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-18',
                    ['20:00', '21:00'],
                ],
                [
                    '8월 8번코트(실외,인조잔디)',
                    '2023-08-25',
                    ['20:00', '21:00'],
                ],
            ],
        },
    }
    return courtMap[target]
}
