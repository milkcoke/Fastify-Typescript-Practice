
## Column Name
By default, column name is generated from property names. \
You can simply change it by specifying a `name` column option:

```typescript
@Entity('contents', {schema: 'public'})
export class Contents extends BaseEntity{
    // ...
    // Column name is `contents_type` from property name `contentsType`
    // Recommend specifying `name` to synchronize real DB
    // `name` is used to generate real sql query.
    @Column({name: 'contents_type', type: 'varchar', default: ()=> "video"})
    contentsType!: string;
}

```

#### Example query
From typeORM method to real query with for understanding how to reference column name in typeORM.

```typescript
@Entity('contents', {schema: 'public'})
export class Contents extends BaseEntity {
    //..
    static findAllContentsType() {
        return this.find({
            select: ['contentsType'],
        });
    }
}
```
#### Generated query from `findAllContentsType()`
```sql
-- Transformed from `contentsType` to `contents_type` (name)
SELECT contents.contents_type 
-- public is schema name in @Entity
FROM public.contents;
```
