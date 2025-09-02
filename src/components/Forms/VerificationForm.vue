<style scoped>
  .otp-Form {
    width: 400px;
    height: 450px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 30px;
    gap: 20px;
    position: relative;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.082);
    border-radius: 15px;
  }

  .mainHeading {
    font-size: 1.6em;
    color: rgb(15, 15, 15);
    font-weight: 700;
  }

  .otpSubheading {
    font-size: 0.9em;
    color: black;
    line-height: 17px;
    text-align: center;
  }

  .inputContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .otp-input {
    background-color: rgb(228, 228, 228);
    width: 50px;
    height: 50px;
    text-align: center;
    border: none;
    border-radius: 7px;
    caret-color: rgb(127, 129, 255);
    color: rgb(44, 44, 44);
    outline: none;
    font-weight: 600;
  }

  .otp-input:focus,
  .otp-input:valid {
    background-color: rgba(127, 129, 255, 0.199);
    transition-duration: .3s;
  }

  .verifyButton {
    width: 100%;
    height: 45px;
    border: none;
    background-color: rgb(127, 129, 255);
    color: white;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    transition-duration: .2s;
  }

  .verifyButton:hover {
    background-color: rgb(144, 145, 255);
    transition-duration: .2s;
  }

  .exitBtn {
    position: absolute;
    top: 5px;
    right: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.171);
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: none;
    color: black;
    font-size: 1.1em;
    cursor: pointer;
  }

  .resendNote {
    font-size: 0.9em;
    color: black;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .resendBtn {
    background-color: transparent;
    border: none;
    color: rgb(127, 129, 255);
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 700;
  }
</style>

<style scoped>
  /* your styles remain unchanged */
</style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const otp = ref(["", "", "", "", "", ""]); // 6-digit OTP
const submitting = ref(false);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const error = ref("");

const countdown = ref(120); // 2 minutes in seconds
let timer = null;

/**
 * Start countdown timer
 */
function startCountdown() {
  countdown.value = 120;
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

/**
 * Automatically move focus to next field when typing
 */
function handleInput(e, index) {
  const value = e.target.value;
  if (/^\d$/.test(value)) {
    otp.value[index] = value;

    // Move to next input if exists
    const next = document.getElementById(`otp-input${index + 2}`);
    if (next) next.focus();
  } else {
    otp.value[index] = "";
  }
}

/**
 * Handle backspace to move focus back
 */
function handleBackspace(e, index) {
  if (e.key === "Backspace" && !otp.value[index] && index > 0) {
    const prev = document.getElementById(`otp-input${index}`);
    if (prev) prev.focus();
  }
}

/**
 * Submit OTP
 */
async function handleSubmit(e) {
  e.preventDefault();
  submitting.value = true;
  error.value = "";

  try {
    const code = otp.value.join(""); // Combine into full string
    await auth.verifyAccount(code);  // 🔑 let auth store handle navigation

    if (auth.error) {
      error.value = auth.error;
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Invalid code. Try again.";
  } finally {
    submitting.value = false;
  }
}


async function resendCode() {
  try {
    await axios.post(`${API_BASE_URL}/api/v1/users/resend-code/`, {
      email: auth.pendingEmail,
    });
    startCountdown(); 
  } catch (err) {
    console.error("❌ Resend error:", err.response?.data || err);
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-screen w-full bg-[#f9fafb]">
    <form class="otp-Form" @submit="handleSubmit">
      <span class="mainHeading">Enter OTP</span>
      <p class="otpSubheading">
        We have sent a verification code to {{ auth.pendingEmail }}
      </p>

      <div class="inputContainer">
        <input
          v-for="(digit, index) in otp"
          :key="index"
          v-model="otp[index]"
          maxlength="1"
          type="text"
          class="otp-input"
          :id="`otp-input${index+1}`"
          @input="handleInput($event, index)"
          @keydown="handleBackspace($event, index)"
        />
      </div>

      <button class="verifyButton" type="submit" :disabled="submitting">
        {{ submitting ? "Verifying..." : "Verify" }}
      </button>

      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

      <p class="resendNote">
        Didn't receive the code?
        <button
          type="button"
          class="resendBtn"
          :disabled="countdown > 0"
          @click="resendCode"
        >
          <span v-if="countdown > 0">
            Resend in {{ Math.floor(countdown / 60) }}:{{ (countdown % 60).toString().padStart(2,'0') }}
          </span>
          <span v-else>
            Resend Code
          </span>
        </button>
      </p>
    </form>
  </div>
</template>