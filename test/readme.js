import {
    expect
} from 'chai';

import _ from 'lodash';

import {
    border
} from './../src/';

import table from './../src/';

import chalk from 'chalk';

describe(`readme`, () => {
    let expectTable;

    before(() => {
        expectTable = (rows, contents) => {
            expect(rows).to.equal(_.trim(contents) + `\n`);
        };
    });

    it(`draws expected table`, () => {
        let data,
            output,
            tableBorder;

        data = [
            [
                chalk.bold(`Spacecraft`),
                chalk.bold(`Launch Date`),
                chalk.bold(`Operator`),
                chalk.bold(`Outcome`),
                chalk.bold(`Remarks`)
            ],
            [
                `Able I`,
                `17 August 1958`,
                `USAF`,
                chalk.white.bold.bgRed(` Launch failure `),
                `First attempted launch beyond Earth orbit; failed to orbit due to turbopump gearbox malfunction resulting in first stage explosion.[3] Reached apogee of 16 kilometres (9.9 mi)`
            ],
            [
                `Luna 2`,
                `12 September 1959`,
                `OKB-1`,
                chalk.black.bgGreen(` Successful `),
                `Successful impact at 21:02 on 14 September 1959. First spacecraft to reach lunar surface`
            ],
            [
                `Lunar Orbiter 1`,
                `10 August 1966`,
                `NASA`,
                chalk.black.bgYellow(` Partial failure `),
                `Orbital insertion at around 15:36 UTC on 14 August. Deorbited early due to lack of fuel and to avoid communications interference with the next mission, impacted the Moon at 13:30 UTC on 29 October 1966.`
            ],
            [
                `Apollo 8`,
                `21 December 1968`,
                `NASA`,
                chalk.black.bgGreen(` Successful `),
                `First manned mission to the Moon; entered orbit around the Moon with four-minute burn beginning at 09:59:52 UTC on 24 December. Completed ten orbits of the Moon before returning to Earth with an engine burn at 06:10:16 UTC on 25 December. Landed in the Pacific Ocean at 15:51 UTC on 27 December.`
            ],
            [
                `Apollo 11`,
                `16 July 1969`,
                `NASA`,
                chalk.black.bgGreen(` Successful `),
                `First manned landing on the Moon. LM landed at 20:17 UTC on 20 July 1969`
            ]

        ];

        tableBorder = _.mapValues(border(`honeywell`), (char) => {
            return chalk.gray(char);
        })

        output = table(data, {
            border: tableBorder,
            column: {
                0: {
                    paddingLeft: 1,
                    paddingRight: 1
                },
                1: {
                    paddingLeft: 1,
                    paddingRight: 1
                },
                2: {
                    paddingLeft: 1,
                    paddingRight: 1
                },
                3: {
                    paddingLeft: 1,
                    paddingRight: 1
                },
                4: {
                    paddingLeft: 1,
                    paddingRight: 1,
                    maxWidth: 50
                }
            }
        });

        console.log(output);
    });

    it(`draws expected table (basic)`, () => {
        let data,
            output;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        output = table(data);

        // console.log(output);

        expectTable(output, `
╔══╤══╤══╗
║0A│0B│0C║
╟──┼──┼──╢
║1A│1B│1C║
╟──┼──┼──╢
║2A│2B│2C║
╚══╧══╧══╝
        `);
    });

    it(`draws expected table (padding)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', 'AABBCC', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                0: {
                    paddingLeft: 3
                },
                1: {
                    maxWidth: 2,
                    paddingRight: 3
                }
            }
        };

        output = table(data, options);

        // console.log(output);

        expectTable(output, `
╔═════╤═════╤══╗
║   0A│AA   │0C║
║     │BB   │  ║
║     │CC   │  ║
╟─────┼─────┼──╢
║   1A│1B   │1C║
╟─────┼─────┼──╢
║   2A│2B   │2C║
╚═════╧═════╧══╝
        `);
    });

    it(`draws expected table (alignment)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                0: {
                    alignment: 'left',
                    minWidth: 10
                },
                1: {
                    alignment: 'center',
                    minWidth: 10
                },
                2: {
                    alignment: 'right',
                    minWidth: 10
                }
            }
        };

        output = table(data, options);

        // console.log(output);

        expectTable(output, `
╔══════════╤══════════╤══════════╗
║0A        │    0B    │        0C║
╟──────────┼──────────┼──────────╢
║1A        │    1B    │        1C║
╟──────────┼──────────┼──────────╢
║2A        │    2B    │        2C║
╚══════════╧══════════╧══════════╝
        `);
    });

    it(`draws expected table (minWith)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                1: {
                    minWidth: 10
                }
            }
        };

        output = table(data, options);

        // console.log(output);

        expectTable(output, `
╔══╤══════════╤══╗
║0A│0B        │0C║
╟──┼──────────┼──╢
║1A│1B        │1C║
╟──┼──────────┼──╢
║2A│2B        │2C║
╚══╧══════════╧══╝
        `);
    });

    it(`draws expected table (maxWith)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', 'AAABBBCCC', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                1: {
                    maxWidth: 3
                }
            }
        };

        output = table(data, options);

        // console.log(output);

        expectTable(output, `
╔══╤═══╤══╗
║0A│AAA│0C║
║  │BBB│  ║
║  │CCC│  ║
╟──┼───┼──╢
║1A│1B │1C║
╟──┼───┼──╢
║2A│2B │2C║
╚══╧═══╧══╝
        `);
    });

    it(`draws expected table (custom border)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            border: {
                topBody: `─`,
                topJoin: `┬`,
                topLeft: `┌`,
                topRight: `┐`,

                bottomBody: `─`,
                bottomJoin: `┴`,
                bottomLeft: `└`,
                bottomRight: `┘`,

                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,

                joinBody: `─`,
                joinLeft: `├`,
                joinRight: `┤`,
                joinJoin: `┼`
            }
        };

        output = table(data, options);

        // console.log(output);

        expectTable(output, `
┌──┬──┬──┐
│0A│0B│0C│
├──┼──┼──┤
│1A│1B│1C│
├──┼──┼──┤
│2A│2B│2C│
└──┴──┴──┘
        `);
    });
});
