<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapState, mapActions } from "pinia";
import d$todo from "@/stores/dashboard/todo";

export default {
  name: "ToDo",
  components: {
    ArgonButton,
  },
  computed: {
    ...mapState(d$todo, ["g$list"]),
  },
  methods: {
    ...mapActions(d$todo, ["a$list", "a$del"]),
    async getList() {
      try {
        await this.a$list();
      } catch (e) {
        console.error("Methods getList error", e);
      }
    },
    async deleteTodo(idTodo) {
      try {
        if (confirm("Do you want to delete this data?") == true) {
          await this.a$del(idTodo);
          alert("Delete Successfully");
          this.$router.go(this.$router.currentRoute);
        } else {
          this.$router.go(this.$router.currentRoute);
        }
      } catch (error) {
        console.error(" error", error);
      }
    },
  },
  async created() {
    await this.getList();
  },
};
</script>

<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Authors table</h6>
      <router-link :to="{ name: 'Add' }">
        <argon-button color="dark" variant="gradient" :to="{ name: 'Add' }">
          <i class="fas fa-plus me-2"></i>
          Add New List
        </argon-button>
      </router-link>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ID <span class="ms-4">Name</span>
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-1"
              >
                description
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Create at
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in g$list" :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="mt-2">
                    <h6 class="me-3">{{ item.id }}</h6>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">
                  {{ item.description }}
                </p>
              </td>
              <!-- <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-secondary">{{
                  item.status
                }}</span>
              </td> -->
              <td
                class="align-middle text-center text-sm"
                v-if="item.status === 'todo'"
              >
                <span class="badge badge-sm bg-gradient-secondary">{{
                  item.status
                }}</span>
              </td>
              <td
                class="align-middle text-center text-sm"
                v-else-if="item.status === 'pending'"
              >
                <span class="badge badge-sm bg-gradient-warning">{{
                  item.status
                }}</span>
              </td>
              <td
                class="align-middle text-center text-sm"
                v-else="item.status === 'done'"
              >
                <span class="badge badge-sm bg-gradient-success">{{
                  item.status
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  item.createdAt
                }}</span>
              </td>
              <td class="align-middle">

                <RouterLink class="btn btn-brand ms-lg-3" :to="{ name: 'edit', params: { id: item.id } }"><i class="ni ni-settings text-dark text-sm opacity-10" aria-hidden="true"></i></RouterLink>
                
                <button
                  class="btn btn-brand text-danger text-gradient ms-lg-2"
                  href="javascript:;"
                  @click.prevent="deleteTodo(item.id)"
                >
                  <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
