export const formatLargeNumber = (value, toFixedNr) => {
    const suffixes = ["", "K", "M", "B", "T"];

    let suffixIndex = 0;
    let formattedValue = value;

    while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
      formattedValue /= 1000;
      suffixIndex++;
    }

    return `${formattedValue.toFixed(toFixedNr)}${suffixes[suffixIndex]}`;
  };