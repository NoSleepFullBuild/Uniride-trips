export function areEqual(value1, value2, epsilon = 0.000001) {
    return Math.abs(value1 - value2) < epsilon;
}