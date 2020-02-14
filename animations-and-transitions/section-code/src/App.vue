<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <hr>
                <select v-model="alertAnimation" class="form-control">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                </select>
                <br><br>

                <button class="btn btn-primary" @click="show = !show">Show Alert</button>
                <br><br>
                <!-- <transition name="fade">  改成使用變數 -->
                <transition :name="alertAnimation">
                    <!-- 也可以使用 v-show -->
                    <div class="alert alert-info" v-show="show">This is some Info</div>
                </transition>

                <!-- 設定 type="animation" 如果 animation 和 transition 設定的秒數不一樣，則以 animation 的秒數為主-->
                <transition name="slide" type="animation">
                    <div class="alert alert-info" v-if="show">This is some Info</div>
                </transition>

                <!-- 如果設定 appear ， 假設 show 一開始顯示就會有初始效果 -->
                <transition name="fade" appear>
                    <div class="alert alert-info" v-if="show">This is some Info</div>
                </transition>

                <!-- 使用 animate.css 使用方式 -class="animated 動畫名稱" -->
                <transition
                    enter-class=""
                    enter-active-class="animated bounce"
                    leave-class=""
                    leave-active-class="animated shake"
                    appear
                >
                    <div class="alert alert-info" v-if="show">This is some Info</div>
                </transition>

                <!-- 二個 div 互相顯示 使用 mode="out-in" 會等其他動畫結果之後再顯示 -->
                <transition :name="alertAnimation" mode="out-in">
                    <div class="alert alert-info" v-if="show" key="info">This is some Info</div>
                    <div class="alert alert-warning" v-else key="warning">This is some Warning</div>
                </transition>

                <hr>
                <button class="btn btn-primary" @click="load = !load">Load / Remove Element</button>
                <br><br>
                <!-- transion js hooks -->
                <!-- :css="false" Vue 會跳過 css 的檢測，可以避免 transition 過程中 css 的影響 -->
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @enter-cancelled="enterCancelled"

                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelled="leaveCancelled"
                    :css="false"
                    >
                    <div style="width: 300px; height: 100px; background-color: lightgreen" v-if="load"></div>
                </transition>
                <hr>
                <button class="btn btn-primary"
                    @click="selectedComponent == 'app-success-alert' 
                        ? selectedComponent = 'app-danger-alert' 
                        : selectedComponent = 'app-success-alert'">
                    Toogle Components
                    </button>
                <br>
                <transition name="fade" mode="out-in">
                    <component :is="selectedComponent"></component>
                </transition>
                <hr>
                <button class="btn btn-primary" @click="addItem">Add Item</button>
                <br><br>
                <ul class="list-group">
                    <transition-group name="slide">
                        <li 
                            class="list-group-item"
                            v-for="(number, index) in numbers"
                            :key="number"
                            @click="removeItem(index)"
                            style="cursor: pointer">{{ number }}
                        </li>
                    </transition-group>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import DangerAlert from './DangerAlert.vue';
    import SuccessAlert from './SuccessAlert.vue';
    export default {
        data() {
            return {
                show: true,
                load: true,
                alertAnimation: 'fade',
                elementWidth: 100,
                selectedComponent: 'app-success-alert',
                numbers:[1, 2, 3, 4, 5]
            }
        },
        methods: {
            // 使用 js 創建動畫
            beforeEnter(el) {
                console.log('beforeEnter');
                this.elementWidth = 100;
                el.style.width = this.elementWidth + 'px';
            },
            enter(el, done) {
                console.log('enter');
                let round = 1;
                // 隨機值 變寬
                const interval = setInterval(() => {
                    el.style.width = (this.elementWidth + round * 10) + 'px';
                    round++;
                    // 20 次之後 取消 interval
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20);
            },
            afterEnter(el) {
                console.log('afterEnter');
            },
            enterCancelled(el) {
                console.log('afterCancelled');
            },
            beforeLeave(el) {
                console.log('beforeLeave');
                this.elementWidth = 300;
                el.style.width = this.elementWidth + 'px'; 
            },
            leave(el, done) {
                console.log('leave');
                let round = 1;
                const interval = setInterval(() => {
                    // 縮小
                    el.style.width = (this.elementWidth - round * 10) + 'px';
                    round++;
                    // 20 次之後 取消 interval
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20);;
            },
            afterLeave(el) {
                console.log('afterLeave');
            },
            leaveCancelled(el) {
                console.log('leaveCancelled');
            },
            addItem() {
                // 隨機插入
                const pos = Math.floor(Math.random() * this.numbers.length);
                this.numbers.splice(pos, 0, this.numbers.length + 1);
            },
            removeItem(index) {
                this.numbers.splice(index, 1);
            }
        },
        components: {
            appDangerAlert: DangerAlert,
            appSuccessAlert: SuccessAlert 
        }
    }
</script>

<style>
    /* 可使用 animate.css */
    /* https://daneden.github.io/animate.css/ */

    /* fade- 對應 transition name  */
    /* fade-in 初始狀態 */
    .fade-enter { 
        /* 一開始隱藏 透明 */
        opacity: 0;
    }

    /* fade-in 動作 */
    .fade-enter-active {
        /* 1秒 至 透明度 1 */
        transition: opacity 1s;
        /* 不設定 不透明為1 */
        /* opacity: 1; */
    }

    .fade-leave {
        /* 不設定 不透明為1 */
        /* opacity: 1; */
    }

    .fade-leave-active {
        /* 1秒 至 透明度 0 */
        transition: opacity 1s;
        opacity: 0;
    }

    .slide-enter {
        /* transform: translateY(20px); */
        opacity: 0;
    }

    .slide-enter-active {
        /* slide-in 需對應 下面的 @keyframes 名稱  */
        animation: slide-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .slide-leave {

    }

    .slide-leave-active {
        /* animation 和 transition 秒數不一樣 */
        animation: slide-out 1s ease-out forwards;
        transition: opacity 3s;
        opacity: 0;
        position: absolute;
    }

    .slide-move {
        transition: transform 1s;
    }
    
    /* 利用 keyframes 設置 幻燈片動畫 */
    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }
</style>
