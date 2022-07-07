
### Active Record Pattern
Define all your query methods inside the model itself, and you save , remove, and load objects using model methods.

```typescript
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

    // active record pattern.
    static findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}
```

### What's Data Mapper pattern?
Data mapper is an approach to access your database within repositories instead of models.

```typescript
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository()
export class UserRepository extends Repository<User> {

    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}
```

### Which one should I choose?
| Index          | Active Record Pattern | Data Mapper |
|----------------|-----------------------|-------------|
| App size       | Small                 | Big         |
| Maintinability |                       | ✅           |
| Simplicity     | ✅                     |             |


## Conclusion
같은 user 테이블로부터 정의한 `User` , `StarUser` 등 실제론 같은 테이블이라도 메소드 커스터마이징하고 Repository 라는 이름으로 확장해서 사용하고 싶으면 Data Mapper,
간단하게 DB 테이블 스키마 그대로 따서 CRUD 하고싶으면 Active Record Pattern 을 사용하자.

