export function formatWithComma(value: number, num_digits: number = 2): string {
    return value.toLocaleString("en-US", {
        minimumFractionDigits: num_digits,
        maximumFractionDigits: num_digits,
      })
}

export function formatToken(mojos: number, asChange: boolean = false): string {
    var prefix = asChange ? "+ " : "";
    if(asChange && mojos < 0) {
        mojos = -mojos;
        prefix = "- "
    }

    return prefix + formatWithComma(mojos / 10 ** 4, 4);
}

export function formatDollars(value: number): string {
    return "$" + formatWithComma(value);
}

export function mojoToXCHString(value: number, showAsChange: boolean = false): string {
    var prefix = showAsChange ? "+ " : "";
    if(showAsChange && value < 0) {
        value = -value;
        prefix = "- "
    }

    return prefix + (value / (10 ** 12)).toFixed(2) + " " + process.env.NEXT_PUBLIC_XCH;
}