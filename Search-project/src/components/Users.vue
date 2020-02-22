<template>
<div>
    <b-card border-variant="light" :header="'id: ' +user._id" :title="user.name">
        <p>{{user.phone}}</p>
        <p>{{user.email}}</p>
        <b-button @click="isDetails=!isDetails" variant="primary">Details</b-button>
        <b-card v-show="isDetails">
            <p>Alias: {{user.alias}}</p>
            <p>External id: {{user.external_id}}</p>
            <p>Last login at: {{user.last_login_at}}</p>
            <p>Locale: {{user.locale}}</p>
            <p>Role: {{user.role}}</p>
            <p>Signature: {{user.signature}}</p>
            <p>Timezone: {{user.timezone}}</p>
            <p>Alias: {{user.alias}}</p>
            <label>Suspended:</label>
            <input type="checkbox" v-model="user.suspended" disabled>
            <label>Verified:</label>
            <input type="checkbox" v-model="user.verified" disabled>
            <label>Shared:</label>
            <input type="checkbox" v-model="user.shared" disabled>
            <label>Active:</label>
            <input type="checkbox" v-model="user.active" disabled>
            <br />
            <b-form-tag v-for="tag in user.tags" :key="tag" 
                :title="tag" class="mr-1">{{ tag }}</b-form-tag>
        </b-card>
      </b-card>
    </div>
</template>
<script>
export default {
   name: 'Users',
   data(){
       return {
           isDetails:false
       }
   },
   props:{
       user: Object
   }
}
</script>
