export function formatPrice(priceText) {
    return parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
}

export function calculateDiscountedPrice(originalPrice, discount) {
    return originalPrice - (originalPrice * (discount / 100));
}
export function logMessage(message) {
    console.log(`[LOG]: ${message}`);
}

export function formatText(text) {
    return text.trim().toLowerCase();
}
export function extractPrice(priceText) {
    return parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
  }
