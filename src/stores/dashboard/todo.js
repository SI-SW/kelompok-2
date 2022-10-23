import { defineStore } from "pinia";
import * as s$todo from "@/service/dashboard/todo";
import { certCookies } from "@/plugins/cookies";

const d$todo = defineStore({
   id: "todo",
   state: () => ({
      list: [],
      input: {
         name: undefined,
         description: undefined,
         category: undefined,
      },
   }),
   actions: {
      async a$list() {
         try {
            const { data } = await s$todo.list();
            this.list = data;
         } catch (e) {
            console.error("Action todo list error", e);
            throw e;
         }
      },
      async a$setAdd() {
         try {
            const { name, description, category } = certCookies();
            this.name = name;
            this.description = description;
            this.category = category;
            return "Todo Adding!";
         } catch ({ message }) {
            this.name = undefined;
            this.description = undefined;
            this.category = undefined;
            throw message;
         }
      },
      async a$add(body) {
         try {
            await s$todo.add(body);
         } catch (e) {
            console.error("Action Add Todo List Error", e);
            throw e;
         }
      },
      async a$del(id) {
         try {
            await s$todo.del(id);
         } catch (e) {
            console.error("delete error", e);
            throw e;
         }
      },
   },
   getters: {
      g$add: ({ name, description, category }) => ({
         name,
         description,
         category,
      }),
      g$list: ({ list }) => list,
   },
});

export default d$todo;
