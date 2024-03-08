from uuid import uuid4

from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class AbstractModel(models.Model):
    uuid = models.UUIDField(default=uuid4, unique=True, primary_key=True)

    class Meta:
        abstract = True


class Bike(AbstractModel):
    price = models.IntegerField()
    image = models.ImageField(upload_to="images/")
    description = models.TextField()
    # Add choices here
    brand = models.CharField(max_length=256)
    # add bike choices like mountain and black mamba
    bike_type = models.CharField(max_length=256)

    def __str__(self):
        return self.brand


class BikeOwner(AbstractModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = PhoneNumberField()
    bikes = models.ManyToManyField(
        Bike, through="BikeOwnerBikeAllocation", related_name="my_bikes"
    )


class BikeOwnerBikeAllocation(AbstractModel):
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
    owner = models.ForeignKey(BikeOwner, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=("bike", "owner"),
                name="unique_owner_bike_pair",
            )
        ]


class BikeShop(AbstractModel):
    bikeowner = models.ForeignKey(BikeOwner, null=False, on_delete=models.CASCADE)
    shop_location = models.CharField(max_length=100)
    attendant = models.CharField(max_length=256)
    contact = models.CharField(max_length=256)
    bikes = models.ManyToManyField(Bike, through="BikeShopAllocation", related_name="shop_bikes")


class BikeShopAllocation(AbstractModel):
    """A shop can have multiple bikes."""

    bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
    shop = models.ForeignKey(BikeShop, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=("bike", "shop"),
                name="unique_shop_bike_pair",
            )
        ]


class Customer(AbstractModel):
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    email = models.EmailField()
    contact = PhoneNumberField()
    id_photo = models.ImageField(upload_to="images")


class CustomerBikeAllocation(AbstractModel):
    """Track customer borrowing."""

    bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
