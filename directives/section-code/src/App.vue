<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Built-in Directives</h1>
                <!-- v- 開頭不是指令名稱的一部份，只是告訴vuejs這不是普通屬性，應該忽略普通 html 屬性 -->
                <p v-text="'Some Text'"></p>
                <p v-html="'<strong>Some strong text</strong>'"></p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Custom Directives</h1>
                <!-- 使用 binding.value 取得 -->
                <!-- <p v-highlight="'red'">Color this</p> -->

                <!-- 定義 delayed  -->
                <p v-highlight:background.delayed="'red'">Color this</p>
                <p v-local-highlight:background.delayed.blink="{ mainColor: 'red', secondColor: 'green', delay: 500 }">Local Color this</p>
                <p v-highlight="'red'">Color this</p>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        directives: {
            // 設定本地 directives
            'local-highlight': {
                bind(el, binding, vnode) {

                    var delay = 0;
                    if (binding.modifiers['delayed']) {
                        delay = 1000;
                    }

                    // 閃爍
                    // setTimeout() 與 setInterval()
                    // setTimeout() 的作用 是在延遲了某段時間 (單位為毫秒) 之後，才去執行「一次」指定的程式碼，並且會回傳一個獨立的 timer ID
                    // setInterval() 則是固定延遲了某段時間之後，才去執行對應的程式碼，然後「不斷循環」。 當然也會回傳一個獨立的 timer ID
                    if (binding.modifiers['blink']) {
                        // let mainColor = binding.value;
                        let mainColor = binding.value.mainColor;
                        // let secondColor = 'blue';
                        let secondColor = binding.value.secondColor;
                        let currentColor = mainColor;
                        setTimeout(() =>{
                            setInterval(() => {
                                currentColor == secondColor ? currentColor = mainColor : currentColor = secondColor;
                                if (binding.arg == 'background') {
                                    el.style.backgroundColor = currentColor;
                                } else {
                                    el.style.color = currentColor;
                                }
                            }, binding.value.delay);
                        }, delay);
                    } else {
                        setTimeout(() =>{
                        if (binding.arg == 'background') {
                            el.style.backgroundColor = binding.value.mainColor;
                        } else {
                            el.style.color = binding.value.mainColor;
                        }
                        }, delay);
                    }
                }
            }
        }
    }
</script>

<style>

</style>
