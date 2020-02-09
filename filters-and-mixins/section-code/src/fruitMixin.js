// 重複使用的資料可以利用 Mixin 獨立出來共用
export const fruitMixin = {
    data() {
        return {
            fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
            filterText: '',
        }
    },
    computed: {
        filteredFruits() {
            return this.fruits.filter((element) => {
                return element.match(this.filterText);
            });
        }
    },
    created() {
        // import 一次就會 created 一次 
        console.log('fruitMixin created');
    }
};