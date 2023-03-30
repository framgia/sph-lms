from enum import Enum

class UserRoleEnum(Enum):
    ADMIN = 1
    COMPANY = 2
    TRAINER = 3
    TRAINEE = 4
    
class StatusEnum(Enum):
    ACTIVE = 1
    INACTIVE = 2