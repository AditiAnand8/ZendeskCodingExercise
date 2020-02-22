<template>
<div>
  <b-card border-variant="dark" :header="'id: ' +ticket._id" :title="ticket.subject">
   <p>{{ticket.description}}</p>
   <p><a v-bind:href="ticket.url">Ticket Url</a></p>
   <b-button @click="isDetails=!isDetails" variant="primary">Details</b-button>
   <b-card v-show="isDetails">
      <p>Created at: {{ticket.created_at}}</p>
      <p>Due at: {{ticket.due_at}}</p>
      <p>Assignee_id: {{ticket.assignee_id}}</p>
      <p>External_id: {{ticket.external_id}}</p>
      <p>priority: {{ticket.priority}}</p>
      <p>Status: {{ticket.status}}</p>
      <p>type: {{ticket.type}}</p>
      <p>via: {{ticket.via}}</p>
      <label>has_incidents:</label>
      <input type="checkbox" v-model="ticket.has_incidents" disabled>
      <p>Submitter_id: {{ticket.submitter_id}} <span><button @click="showSubmitterDetails=!showSubmitterDetails">Submitter Info</button></span></p>
      <UsersComponent v-if="userInfo" v-show="showSubmitterDetails" v-bind:user="userInfo" />
      <br/>
      <p>organization_id: {{ticket.organization_id}} <span><button @click="showOrganizationDetails=!showOrganizationDetails">Organization Info</button></span></p>
      <OrganizationsComponent v-if="organization" v-show="showOrganizationDetails" v-bind:organization="organization" />
      <br/>
      <b-form-tag v-for="tag in ticket.tags" :key="tag" 
                    :title="tag" class="mr-1">{{ tag }}</b-form-tag>
    </b-card>
  </b-card>
</div>
</template>
<script>
import UsersComponent from './Users.vue';
import OrganizationsComponent from './Organizations.vue'

export default {
   name: 'Tickets',
   data(){
       return {
         isDetails: false,
         showSubmitterDetails: false,
         showOrganizationDetails: false
       }
   },
   components:{
     UsersComponent,
     OrganizationsComponent
   },
   props:{
       ticket: Object,
       organization: Object,
       userInfo: Object
   }
}
</script>
