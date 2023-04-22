export function formatWithComma(value: number, num_digits: number = 2): string {
    return value.toLocaleString("en-US", {
        minimumFractionDigits: num_digits,
        maximumFractionDigits: num_digits,
      })
}

export function formatToken(mojos: number): string {
    return formatWithComma(mojos / 10 ** 4, 4);
}

export function formatDollars(value: number): string {
    return "$" + formatWithComma(value);
}

export function mojoToXCHString(value: number): string {
    return (value / (10 ** 12)).toFixed(2) + " " + process.env.NEXT_PUBLIC_XCH;
}