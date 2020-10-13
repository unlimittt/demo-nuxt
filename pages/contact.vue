<template>
  <b-row justify="center">
    <b-col cols="12" lg="9">
      <h1>Contact Us</h1>
      <b-form
        name="contact"
        method="POST"
        data-netlify="true"
        @submit="onSubmit"
      >
        <b-form-group
          id="name"
          label="Name:"
          label-for="name"
          :state="errors.name ? false : null"
          :invalid-feedback="errors.name"
        >
          <b-form-input
            id="name"
            placeholder="Your Name"
            :value="values.name"
            :state="errors.name ? false : null"
            @blur="onChange('name', $event.target.value)"
          />
        </b-form-group>

        <b-form-group
          id="email"
          label="Email:"
          label-for="email"
          :state="errors.name ? false : null"
          :invalid-feedback="errors.email"
        >
          <b-form-input
            id="email"
            type="email"
            placeholder="me@example.com"
            :value="values.email"
            :state="errors.email ? false : null"
            @blur="onChange('email', $event.target.value)"
          />
        </b-form-group>

        <b-form-group
          id="subject"
          label="Subject:"
          label-for="subject"
          :state="errors.subject ? false : null"
          :invalid-feedback="errors.subject"
        >
          <b-form-input
            id="subject"
            placeholder="Subject"
            :value="values.subject"
            :state="errors.subject ? false : null"
            @blur="onChange('subject', $event.target.value)"
          />
        </b-form-group>

        <b-form-group
          id="message"
          label="Message:"
          label-for="message"
          :state="errors.message ? false : null"
          :invalid-feedback="errors.message"
        >
          <b-form-textarea
            id="message"
            placeholder="Some text..."
            rows="4"
            :value="values.message"
            :state="errors.message ? false : null"
            @blur="onChange('message', $event.target.value)"
          />
        </b-form-group>

        <b-form-group>
          <b-btn type="submit" variant="primary">Send</b-btn>
        </b-form-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { object, string } from 'yup'

const validationSchema = object().shape({
  name: string().label('Name').required(),
  email: string().label('Email').required().email(),
  subject: string().label('Subject').required(),
  message: string().label('Message').required().min(20).max(400),
})

export default {
  data() {
    return {
      values: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      errors: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
    }
  },
  methods: {
    onChange(field, value) {
      this.values = { ...this.values, [field]: value }
      validationSchema
        .validateAt(field, this.values)
        .then(() => {
          this.errors[field] = ''
        })
        .catch((err) => {
          this.errors[err.path] = err.message
        })
    },
    onSubmit(e) {
      validationSchema
        .validate(this.values, { abortEarly: false })
        .then()
        .catch((err) => {
          e.preventDefault()
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message }
          })
        })
    },
  },
  head() {
    return { title: 'Contact' }
  },
}
</script>
