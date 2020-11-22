export default function numberFormat(number, { decimalCount = 2, decimalSeparator = ',', thousands = ' ', decimalOptional = true } = {}) {
    try {
        const absNumber = Math.abs(number);
        const decimalPart = absNumber - Math.floor(absNumber);

        decimalCount = Math.abs(decimalCount);
        decimalCount = decimalPart === 0 && decimalOptional ? 0 : isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = number < 0 ? '-' : '';

        let i = parseInt(number = Math.abs(Number(number) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign
            + (j ? i.substr(0, j) + thousands : '')
            + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)
            + (decimalCount ? decimalSeparator + Math.abs(number - i)
                .toFixed(decimalCount)
                .slice(2) : '');
    } catch (error) {
        console.log(error);
    }
}
