<template>
  <div class="form-outline">
    <input
      type="text"
      class="form-control form-control-xl"
      :placeholder="placeholder"
      :value="modelValue"
      @focus="updateInput"
      @input="updateInput"
      @blur="updateInput"
    />
    <label class="form-label">{{ label }}</label>
  </div>
</template>

<script>
import * as mdb from 'mdb-ui-kit'

export default {
  name: 'my-input',
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number]
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  },
  mounted() {
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
      new mdb.Input(formOutline).init();
    });
  },
  updated() {
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
      new mdb.Input(formOutline).init();
    });
  }
}
</script>

<style>
.form-outline * {
  color: #c71585 !important;
}
.form-outline .form-control:focus~.form-notch .form-notch-leading {
  border-top: .125rem solid deeppink;
  border-bottom: .125rem solid deeppink;
  border-left: .125rem solid deeppink;
}
.form-outline .form-control:focus~.form-notch .form-notch-middle {
  border-bottom: .125rem solid;
  border-color: deeppink;
}

.form-outline .form-control:focus~.form-notch .form-notch-trailing {
  border-color: currentcolor currentcolor currentcolor deeppink;
  border-bottom: .125rem solid deeppink;
  border-right: .125rem solid deeppink;
  border-top: .125rem solid deeppink;
}
.form-control, .form-control~.form-label {
  font-size: 1.5em !important;
}
.form-outline .form-control.active~.form-label, .form-outline .form-control:focus~.form-label {
  transform: translateY(-0.9em) translateY(0.1rem) scale(.8);
}

@media screen and (max-width: 992px) {
  .form-control, .form-control~.form-label {
    font-size: 1.25em !important;
  }
}
</style>