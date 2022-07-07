
## Join 에도 And 조건이 가능?

### ON vs WHERE
ON: Join 전 필터링 (AND 로 조건 여러개 걸기 가능)
WHERE: 당연히 Join 후 필터링

✅ 가능 
- outer join \ 
** 조건에 부합하지 않은 값들은 null 처리됨. **

- inner join \
WHERE 절 효과가 발생됨.

## 🔗 Reference
- [Join 에서 WHERE 과 ON 차이 - tistory](https://developyo.tistory.com/121)
