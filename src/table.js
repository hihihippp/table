import _ from 'lodash';
import drawTable from './drawTable';
import calculateColumnSizeIndex from './calculateColumnSizeIndex';
import makeConfig from './makeConfig';
import calculateRowSpanIndex from './calculateRowSpanIndex';
import mapDataUsingRowSpanIndex from './mapDataUsingRowSpanIndex';
import stringWidth from 'string-width';
import align from './align';
import validateData from './validateData';

/**
 * @typedef {String} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~configColumn
 * @property {String} alignment Cell content alignment (enum: left, center, right) (default: left).
 * @property {Number} minWidth Minimum column width (default: 0).
 * @property {Number} maxWidth Maximum column width (default: Infinity).
 * @property {Number} paddingLeft Cell content padding width left (default: 0).
 * @property {Number} paddingRight Cell content padding width right (default: 0).
 */

/**
 * @typedef {Object} table~configBorder
 * @property {String} topBody
 * @property {String} topJoin
 * @property {String} topLeft
 * @property {String} topRight
 * @property {String} bottomBody
 * @property {String} bottomJoin
 * @property {String} bottomLeft
 * @property {String} bottomRight
 * @property {String} bodyLeft
 * @property {String} bodyRight
 * @property {String} bodyJoin
 * @property {String} joinBody
 * @property {String} joinLeft
 * @property {String} joinRight
 * @property {String} joinJoin
 */

/**
 * @typedef {Object} table~config
 * @property {table~configBorder}
 * @property {table~configColumn[]} column Column specific configuration.
 */

/**
 * Generates a text table.
 *
 * @param {table~row[]} rows
 * @param {table~config} config
 * @return {String}
 */
export default (rows, config = {}) => {
    let derivedConfig,
        safeData,
        rowSpanIndex,
        columnSizeIndex,
        dataMappedUsingRowSpanIndex,
        tableBorder;

    validateData(rows);

    safeData = _.map(rows, (columns) => {
        return _.map(columns, String);
    });

    // console.log(`safeData`, safeData);

    derivedConfig = makeConfig(safeData, config);

    // console.log(`derivedConfig`, derivedConfig);

    rowSpanIndex = calculateRowSpanIndex(safeData, derivedConfig);

    // console.log(`rowSpanIndex`, rowSpanIndex);

    dataMappedUsingRowSpanIndex = mapDataUsingRowSpanIndex(safeData, rowSpanIndex, derivedConfig);

    // console.log(`dataMappedUsingRowSpanIndex`, dataMappedUsingRowSpanIndex);

    dataMappedUsingRowSpanIndex = _.map(dataMappedUsingRowSpanIndex, (cells, index0) => {
        return _.map(cells, (value, index1) => {
            let column;

            column = derivedConfig.column[index1];

            // console.log(column);

            if (stringWidth(value) === column.maxWidth) {
                return value;
            } else {
                return align(value, column.minWidth, column.alignment);
            }
        });
    });

    dataMappedUsingRowSpanIndex = _.map(dataMappedUsingRowSpanIndex, (cells, index0) => {
        return _.map(cells, (value, index1) => {
            let column;

            column = derivedConfig.column[index1];

            return _.repeat(` `, column.paddingLeft) + value + _.repeat(` `, column.paddingRight);
        });
    });

    //_.times(config.column[index1].paddingLeft, ` `)

    columnSizeIndex = calculateColumnSizeIndex(dataMappedUsingRowSpanIndex[0]);

    // console.log(`columnSizeIndex`, columnSizeIndex);

    return drawTable(dataMappedUsingRowSpanIndex, derivedConfig.border, columnSizeIndex, rowSpanIndex);
};
