<script>
import { mapActions } from "pinia";
import d$todo from "@/stores/dashboard/todo";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "ToDo-Add",
  data: () => ({
    input: {
      name: "",
      description: "",
      category: "",
    },
  }),
  components: {
    ArgonInput,
    ArgonButton,
  },
  methods: {
    ...mapActions(d$todo, ["a$add"]),
    async addList() {
      try {
        await this.a$add({ ...this.input });
        this.$router.replace({ name: "ToDo" });
      } catch (e) {
        console.error("Methods getList error", e);
      }
    },
  },
};
</script>

<template>
  <div class="card col-md-8 offset-2 mt-4 mb-4">
    <div class="card-body">
      <form @submit.prevent="addList" method="post">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Name</label>
          <argon-input
            v-model="input.name"
            type="text"
            placeholder="Name"
            name="name"
            size="lg"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Description</label
          >
          <argon-input
            v-model="input.description"
            type="text"
            placeholder="Description"
            name="description"
            size="lg"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Category</label>
          <argon-input
            v-model="input.category"
            type="text"
            placeholder="Category"
            name="category"
            size="lg"
          />
        </div>
        <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
        <div class="text-center">
          <argon-button
            class="mt-4"
            variant="gradient"
            color="success"
            fullWidth
            size="lg"
            type="submit"
            >Submit</argon-button
          >
        </div>
      </form>
    </div>
  </div>
</template>
