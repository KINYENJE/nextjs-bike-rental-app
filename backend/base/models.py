from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from uuid import uuid4

# Create your models here. 
class AbstractModel(models.Model):
    uuid=models.UUIDField(default=uuid4(),unique=True,primary_key=True)
    class Meta:
        abstract=True
        
class Bike(AbstractModel):
    price = models.IntegerField()
    image = models.ImageField(upload_to='images/')
    description = models.TextField()   
    # Add choices here
    brand = models.CharField(max_length=256)
    # add bike choices like mountain and black mamba
    bike_type = models.CharField(max_length=256)
    
    def __str__(self):
        return self.name     
        
class BikeOwner(AbstractModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = PhoneNumberField()
    bikes = models.ManyToManyField(
        Bike, through="BikeOwnerAllocation", related_name="my_bikes"
    )
    

    
class BikeOwnerBikeAllocation(AbstractModel):
    bike = models.ForeignKey(Bike)
    owner = models.ForeignKey(BikeOwner)
    
    class Meta:
        unique_together = ('bike', 'owner')
    

    
class BikeShop(AbstractModel):
    bikeowner=models.ForeignKey(BikeOwner, null=False,on_delete=models.CASCADE)
    shop_location=models.CharField(max_length=100)
    attendant = models.CharField(max_length=256)
    contact = models.CharField(max_length=256)
    bikes = models.ManyToManyField(
        Bike, through="BikeShopAllocation", related_name="shop_bikes"
    )

class BikeShopAllocation(AbstractModel):
    """A shop can have multiple bikes."""
    bike = models.ForeignKey(Bike)
    shop = models.ForeignKey(BikeShop)
    
    class Meta:
        constraints = (
            models.UniqueConstraint(
                fields=('bike','shop'),
                name='unique_shop_bike_pair',)
        )
    

    
class Customer(AbstractModel):
    first_name=models.CharField(max_lengh=50)
    second_name=models.CharField(max_lengh=50)
    email=models.EmailField()
    contact= PhoneNumberField()
    user_id=models.IntegerField(max_length=8)
    id_photo=models.ImageField(upload_to="/images")
    
class CustomerBikeAllocation(AbstractModel):
    """Track customer borrowing."""
    bike = models.ForeignKey(Bike)
    customer = models.ForeignKey(Customer)