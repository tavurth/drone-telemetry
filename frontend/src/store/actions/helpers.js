/**
 * Takes in data from the server, orders it into groups and returns the grouped object.
 *
 * @param {array<object>} newData - [{group: 'bin', reduction:[]}].
 * @returns {object<array>} {'bin': [{group:'bin'}...]}
 */
export function objectFromGroups(groupedDataArray) {
    const toReturn = {};

    // Create an object from the groups
    for (let dataSet of groupedDataArray) {
        const { group, reduction } = dataSet;
        toReturn[group] = reduction;
    }

    return toReturn;
}
