import requests
from django.core.cache import cache

def convert_bdt_to_usd(amount_in_bdt):
    """
    Convert Bangladeshi Taka (BDT) to US Dollars (USD) using an external API.
    """
    cache_key = "bdt_to_usd_exchange_rate"
    exchange_rate = cache.get(cache_key)

    if not exchange_rate:
        try:
            # Fetch the latest exchange rate from BDT to USD
            response = requests.get("https://api.exchangerate-api.com/v4/latest/USD")
            response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)
            data = response.json()
            exchange_rate = data["rates"]["BDT"]  # Get the BDT to USD rate
            cache.set(cache_key, exchange_rate, timeout=3600)  # Cache for 1 hour
        except requests.RequestException as e:
            raise Exception(f"Failed to fetch exchange rate: {str(e)}")

    amount_in_usd = amount_in_bdt / exchange_rate
    return int(amount_in_usd * 100)  # Convert to cents