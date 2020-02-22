<template>
  <div>
    <h1>Welcome to Zendesk Search!</h1>
      <div class="search-wrapper">
        <b-row class="my-1">
          <b-col >
            <label>Search:</label>
          </b-col>
          <b-col sm="11">
            <b-form-input v-model="search" placeholder="Search tickets/users/organizations"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">Ticket Search:</b-col>
          <b-col sm="2">
            <select v-model="selectedPriority">
              <option value="">Please select priority</option>
              <option :key="priority" v-for="priority in priorities">{{priority}}</option>
            </select>
          </b-col>
          <b-col sm="2">
            <select v-model="selectedStatus">
              <option value="">Please select status</option>
              <option :key="status" v-for="status in ticketStatus">{{status}}</option>
            </select>
          </b-col>
           <b-col sm="2">
            <select v-model="selectedType">
              <option value="">Please select type</option>
              <option :key="type" v-for="type in ticketTypes">{{type}}</option>
            </select>
          </b-col>
        </b-row>
      </div>
      <div>
        <b-card>
          <b-tabs card>
            <b-tab title="Tickets" active>
              <div class="mt-3" v-bind:key="ticket._id" v-for="ticket in ticketsJsonComputed">
                <TicketsComponent v-bind:ticket="ticket" v-bind:userInfo="getUserInfoFromSubmitterId(ticket.submitter_id)" v-bind:organization="getOrganizationFromTicket(ticket)" />
              </div>
            </b-tab>
            <b-tab title="Users">
                <div class="mt-3" v-bind:key="user._id" v-for="user in usersJsonComputed">
                  <UsersComponent v-bind:user="user" />
                </div>
            </b-tab>
            <b-tab title="Organizations">
                <div class="mt-3" v-bind:key="organization._id" v-for="organization in organizationsJsonComputed">
                  <OrganizationsComponent v-bind:organization="organization" />
                </div>
            </b-tab>
          </b-tabs>
          </b-card>
        </div>
    </div>
</template>
<script>
import tickets from '../assets/tickets.json'
import organizations from '../assets/organizations.json';
import users from '../assets/users.json'
import { BCard } from 'bootstrap-vue'
import TicketsComponent from './Tickets.vue'
import UsersComponent from './Users.vue';
import OrganizationsComponent from './Organizations.vue'

export default {
  name: 'Search',
  data(){
    return {
      ticketsJson: tickets,
      organizationsJson: organizations,
      usersJson: users,
      search: '',
      selectedPriority: '',
      selectedStatus: '',
      selectedType: ''
    }
  },
  components:{
    BCard,
    TicketsComponent,
    UsersComponent,
    OrganizationsComponent
  },
  computed: {
    ticketsJsonComputed: function (){
      let data = this.ticketsJson
      if(this.search){
        data = data.filter(x => this.find(x.description) || this.find(x.subject) 
        || this.find(x.type) || this.find(x.external_id) || this.find(x.priority)
        || this.find(x.status) || this.find(x.created_at) || this.find(x._id)
        || this.find(x.via) || this.find(x.url) || this.find(x.due_at))
      }
      if(this.selectedPriority){
        data = data.filter(x=> x.priority == this.selectedPriority)
      }
      if(this.selectedStatus){
        data = data.filter(x=> x.status == this.selectedStatus)
      }
      if(this.selectedType){
        data = data.filter(x=> x.type == this.selectedType)
      }
      return data
    },
    usersJsonComputed: function (){
      let data = this.usersJson
      if(this.search){
        data = data.filter(x => this.find(x.alias) || this.find(x.email) || 
        this.find(x.created_at) || this.find(x.external_id) || this.find(x.signature) ||
        this.find(x.last_login_at) || this.find(x.locale) || this.find(x._id) || this.find(x.timezone)
        || this.find(x.name) || this.find(x.phone) || this.find(x.role))
      }
      return data
    },
    organizationsJsonComputed: function (){
      let data = this.organizationsJson
      if(this.search){
        data = data.filter(x => this.find(x.created_at) || this.find(x.details) || 
        this.find(x.external_id) || this.find(x.name) || this.find(x.url))
      }
      return data
    },
    priorities: function (){
      let priorities = []
      this.ticketsJson.map(x => {
        if(!priorities.includes(x.priority)){
          priorities.push(x.priority)
        }
      })
      return priorities
    },
    ticketStatus: function (){
      let status = []
      this.ticketsJson.map(x => {
        if(!status.includes(x.status)){
          status.push(x.status)
        }
      })
      return status
    },
    ticketTypes: function (){
      let types = []
      this.ticketsJson.map(x => {
        if(!types.includes(x.type) && x.type != ' '){
          types.push(x.type)
        }
      })
      return types
    }
  },
  methods: {
    getOrganizationFromTicket(ticket){
      return this.organizationsJsonComputed.find(x => x._id == ticket.organization_id)
    },
    find(searchText){
      return String(searchText).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
    },
    getUserInfoFromSubmitterId(submitterId){
      return this.usersJsonComputed.find(x => x._id == submitterId)
    }
  }
}
</script>
