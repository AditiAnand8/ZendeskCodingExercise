<template>
<div>
    <b-card border-variant="light" :header="'id: ' +organization._id" :title="organization.name">
        <a v-bind:href="organization.url">Organization Url</a>  
        <p>Details: {{organization.details}}</p>
        <b-button @click="isDetails=!isDetails" variant="primary">Details</b-button>
        <b-card v-show="isDetails">
            <p>Created at: {{organization.created_at}}</p>
            <p>External id: {{organization.external_id}}</p>
            <p>domain_names: <span :key="domain" v-for="domain in organization.domain_names"> {{domain}} </span></p>
            <label>shared_tickets</label>
            <input type="checkbox" v-model="organization.shared_tickets" disabled>
            <br/>
            <b-form-tag
                v-for="tag in organization.tags"
                :key="tag"
                :title="tag"
                class="mr-1"
                >{{ tag }}</b-form-tag>
        </b-card>
    </b-card>
</div>
</template>
<script>
export default {
   name: 'Organizations',
   data(){
       return {
           isDetails: false
       }
   },
   props:{
       organization: Object
   }
}
</script>