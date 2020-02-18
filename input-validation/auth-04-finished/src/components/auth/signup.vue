<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <!-- $v 是 vuelidate 特殊屬性 保留字 -->
          <!-- $touch 是由 vuelidate 自動公開和添加方法，在輸入事件中為其註冊此碼的輸入 -->
          <!-- @blur="$v.email.$touch()" focus 離開才觸發 -->
          <!-- @input="$v.email.$touch()" input 就觸發 -->
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
          <p v-if="!$v.email.required">This field must not be empty.</p>
            <p>$v status: {{ $v }}</p>
        </div>
        <div class="input" :class="{invalid: $v.age.$error}">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  @blur="$v.age.$touch()"
                  v-model.number="age">
          <p v-if="!$v.age.minVal">Your have to be at least {{ $v.age.$params.minVal.min }} years old.</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch"
                  v-model="password">
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch"
                  v-model="confirmPassword">
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :class="{invalid: $v.hobbyInputs.$each[index].$error}"
                    :key="hobbyInput.id">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      @blur="$v.hobbyInputs.$each[index].value.$touch()"
                      v-model="hobbyInput.value">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
            </div>
            <p v-if="!$v.hobbyInputs.minLen">You have to specify as least {{ $v.hobbyInputs.$params.minLen.min }} hobbies.</p>
            <p v-if="!$v.hobbyInputs.required">Please add hobbies.</p>
          </div>
        </div>
        <div class="input inline" :class="{invalid: $v.terms.$invalid}">
          <input type="checkbox" id="terms" v-model="terms" @change="$v.terms.$touch()">
          <label for="terms">Accept Terms of Use</label>
      </div>
        <!-- <div class="input inline" :class="{invalid: $v.terms.$invalid}">
          <input
            type="checkbox"
            id="terms"
            @change="$v.terms.$touch()"
            v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div> -->
        <div class="submit">
          <!--
          $v.dirty，表示是不是從未點擊過這個控件
          $v.$invalid，如果任何一個驗證器沒通過，就是true
          $v.$error，在$invalid和$dirty都為true的情況下為true，表示用戶點擊過但仍未輸入正確，這是為了防止進入頁面，用戶還沒碰過這個框的時候就報錯
          -->
          <button type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators';
  import axios from 'axios';
  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: [],
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email, // 如果每次 key 就觸發會有垃報請求的危險
        unique: val => {
          if (val === '') return true // 為空 因為不在乎是否唯一
          // return new Promise((resolve, reject) => {
          //   setTimeout(() => {
          //     resolve(val !== 'test@test.com');
          //   }, 1000)
          // });
          return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
            .then(res => {
              console.log(res);
              return Object.keys(res.data).length === 0;
            });
        }
      },
      age: {
        required,
        numeric,
        minVal: minValue(18)
      },
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        // sameAs: sameAs('password') // password 為 data() 中的 password 屬性名稱
        sameAs: sameAs(vm => {
          return vm.password; // 可以自行設定 function
        })
      },
      terms: {
        sameAs: sameAs( () => true)
        // checked(val) {
        // return this.country === "germany" ? true : val;
        // }
        // required: requiredUnless(vm => {
          // return vm.country === 'germany';
        // })
      },
      hobbyInputs: {
        required,
        minLen: minLength(1), // 最少新增一個
        $each: { // 判斷陣列內容 
          value: {
            required,
            minLen: minLength(5) // hobbyInputs 內容最少5個字元
          }
        }
      }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          hobbies: this.hobbyInputs.map(hobby => hobby.value),
          terms: this.terms
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>