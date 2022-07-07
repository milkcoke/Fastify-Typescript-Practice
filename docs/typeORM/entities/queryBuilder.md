
## Example table
| table   | user            | profile |
|---------|-----------------|---------|
| PK      | id              | id      |
| column1 | profile_id (FK) | name    |
| column2 | etc..           | gender  |



## How to use

#### Entity Manager
```typescript
// .select is used when to use entitymanager (not sepcific repository)
    const data = await this.orm.entityManager()
        // if only get 'alais_name' , would get all columns in query result.
                            .select('alias_name')
                            .from(EntityName, 'alais_name')
```

#### Repository
```typescript
// if use repository, entity name should be alias automatically (default)
// or set in `.createQueryBuilder()`
    const data = await this.orm.getRepository(EntityName)
                            .createQueryBuilder('alias_name')
        // alias.property = real_table_name to join
        // => On `profile`.'id' = `u`.'profile_id'
        // => user 테이블은 일단 다 풀스캔 but profile 존재할 경우에만 추가로 
        // 존재하지 않으면, null 처리
                            .leftJoinAndSelect("u.profile", "profile")
                            .getMany()
                            .getRawMany()
// Raw: entity name lower case would be prefix of column name.
```

## Left Join

### Example query
```sql
select emp_no ,emp_name , age, salary , dept_name, location 
from employee 
    -- left: employee (Table A)
    -- right: department (Table B)
left join department on employee.dept_no = department.dept_no;
```

### `innerJoin()` vs `innerJoinAndSelect()`
#### innerJoin()
오로지 select 절에서 선택한 attribute 만 끌어옴 \
You can inner join without its selection.
```typescript
const user = await createQueryBuilder("user")
    .innerJoin("user.photos", "photo")
    .where("user.name = :name", { name: "Timber" })
    .getOne()
```
will generate
```sql
-- select only attributes in `.select()`
-- or original (`from` clause) table attributes
SELECT user.* FROM users user
    INNER JOIN photos photo ON photo.user = user.id
    WHERE user.name = 'Timber'
```
#### innerJoinAndSelect
AndSelect => **Select all attributes** from join table.
```typescript
const user = await createQueryBuilder("user")
    .innerJoinAndSelect(
        "user.photos",
        "photo",
        "photo.isRemoved = :isRemoved",
        { isRemoved: false },
    )
    .where("user.name = :name", { name: "Timber" })
    .getOne()
```

will generate:
```sql
--- get all attributes from joined table
SELECT user.*, photo.* FROM users user
    INNER JOIN photos photo ON photo.user = user.id AND photo.isRemoved = FALSE
    WHERE user.name = 'Timber'
```
### Result
The output that we will get is as follows :-
As left join gives the matching rows and the rows that are present in the left table but not in right table.


| emp_no | emp_name	    | age	      | salary	 | dept_name	 | location |
|--------|--------------|-----------|---------|------------|----------|
| E1	    | Varun        | Singhal	  | 27	     | 30,000	    | IT	      |Delhi|
| E3     | 	Ravi Anand	 | 30	34,000 | 	IT     | 	Delh      | Delhi    |
| E2	    | Amrita       | Singhal	  | 28	     | 25,000	    | HR	      |Hyderabad|
| E4	    | Nitin Saini  | 	34       | 	54,000 | 	[NULL]    | 	[NULL]  |
| E5	    | Muskan Garg  | 	35	      | 65,000	 | [NULL]	    | [NULL]   |


## 🔗 Reference
- [Sql left join - GeeksForGeeks](https://www.geeksforgeeks.org/sql-left-join/)