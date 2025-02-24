from django.db import models

class Transaction(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)  # Add currency field
    stripe_payment_id = models.CharField(max_length=255)  # Add Stripe payment ID field
    created_at = models.DateTimeField(auto_now_add=True)  # Add created_at field
    user_email = models.EmailField()  # Add user_email field

    def __str__(self):
        return f"{self.amount} {self.currency} - {self.stripe_payment_id}"