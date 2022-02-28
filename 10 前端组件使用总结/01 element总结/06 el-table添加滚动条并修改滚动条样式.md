需求如题，添加`CSS`样式：

```css
::v-deep .el-table__body-wrapper {
	height: 500px !important; /*给一个固定高度*/
	overflow-y: auto; /*y轴溢出显示滚动条*/
	&::-webkit-scrollbar {
		width: 4px; /* y轴滚动条宽度 */
        height:4px; /* x轴滚动条宽度 */
        background-color: #f5f5f5; /*滚动条背景*/
	}
}
 
/* 滑块内阴影+圆角 */
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background: rgba(0, 0, 0, 0.2);
}
 
/* 滚动条轨道内阴影+圆角 */
::-webkit-scrollbar-track {
	border-radius: 0;
	background: rgba(0, 0, 0, 0.1);
}
```

> `::v-deep`是因为有scoped作用域