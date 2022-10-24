<script>
import { mapActions, mapState } from "pinia";
import d$todo from "@/stores/dashboard/todo";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
   name: "ToDo-Add",
   components: {
      ArgonInput,
      ArgonButton,
   },
   data: () => ({
      input: {
         id: "",
         name: "",
         description: "",
         status: "",
      },
      dropdown: {
         status: ["todo", "done", "pending"],
      },
   }),
   computed: {
      ...mapState(d$todo, ["g$detail"]),
   },
   methods: {
      ...mapActions(d$todo, ["a$update"]),

      async onSubmit() {
         const dataId = this.input.id;
         console.log(dataId);
         try {
            await this.a$update(
               {
                  name: this.input.name,
                  description: this.input.description,
                  status: this.input.status,
               },
               dataId
            );
            alert("Update Berhasil");
            this.$router.push({ name: "ToDo" });
         } catch (error) {
            console.error("method addlist error", error);
         }
      },
   },
   created() {
      this.input = { ...this.g$detail(this.$route.params.id) };
   },
};
</script>

<template>
   <div class="card col-md-8 offset-2 mt-4 mb-4">
      <div class="card-body">
         <form @submit.prevent="onSubmit" method="post">
            <div class="mb-3">
               <label class="form-label"
                  >Name
                  <input v-model="input.name" type="text" placeholder="Name" name="name" size="lg" />
               </label>
            </div>
            <div class="mb-3">
               <label class="form-label"
                  >Description
                  <input v-model="input.description" type="text" placeholder="Description" name="description" size="lg" />
               </label>
            </div>
            <div class="mb-3">
               <label class="form-label">Status</label>
               <select v-model="input.status" class="form-select">
                  <option value="" selected hidden disabled>Options</option>
                  <template v-for="item in dropdown.status" :key="item">
                     <option :value="item">
                        {{ item }}
                     </option>
                  </template>
               </select>
            </div>
            <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
            <div class="text-center">
               <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg" type="submit">Submit</argon-button>
            </div>
         </form>
      </div>
   </div>
</template>