
# 地图

- isLeftOf(a, b)
- isRightOf(a, b)
- isTopOf(a, b)
- isBottomOf(a, b)

- isStraightLeftOf(a, b)
- isStraightRightOf(a, b)
- isStraightTopOf(a, b)
- isStraightBottomOf(a, b)

- canLeft(target)
- canRight(target)
- canUp(target)
- canDown(target)

- addUnit(unit);
- removeUnit(unit); // 内部方法，由地图自己根据life属性判断是否移除单位
- eachUnit(unit, params, func); 遍历unit, params属性

- updateMap(); // 更新地图上所有的单位，移除死亡单位，绘制调试信息

# 地图单位

- map 地图对象
- mapX int
- mapY int
- mapWidth int
- mapHeight int

- group string 分组
- unitType string 单位类型

- life int 生命值
- armor int 护甲
- physicalDamage int 物理攻击力
- magicalDamage int 魔法攻击
- range 攻击距离
- sight 视野距离
- speed 移动速度
- movable boolean 是否能移动

- getPhysicalDamage();
- getMagicalDamage();
- attack(target)
- attacked(target)
- die();

- moveTo(x, y); 移动到