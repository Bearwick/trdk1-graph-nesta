export default {
  // OUTDATED
  getODAProblems: (limit: number, offset: number, searchString: string, category: string, email?: string, relation?: number, approved?: boolean, similarProblem?: string, filter?: number) => `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX oda: <urn:absolute:ODA2.0#>
  ${similarProblem ? 'PREFIX similarProblem:<'.concat(similarProblem, '>') : ''}
  select * where {
   
   ${similarProblem ?
    `    {
        select distinct ?odaProblem {
              ?odaProblem oda:relatedVendor_ODAProblem|oda:relatedDP_ODAProblem|oda:relatedSP_ODAProblem|oda:relatedAD_ODAProblem similarProblem:.
        }
    }` : ' ?odaProblem rdf:type oda:ODAProblem.'
  }
    ?odaProblem oda:hasSpecificProblem ?specificProblem.
    ?odaProblem oda:hasClearDataProduct ?dataProduct.
    ?odaProblem oda:hasAccesibleData ?accessibleData.
    ?odaProblem oda:hasDefinedAction ?definedAction.
    ?odaProblem oda:hasVendor ?vendor.
    
    ?odaProblem oda:ODATitle ?title.
    ?specificProblem oda:specificProblemDescription ?specificProblemDescription.
    ?dataProduct oda:dataProductDescription ?dataProductDescription.
    ?accessibleData oda:accesibleDataDescription ?accessibleDataDescription.
    ?definedAction oda:definedActionDescription ?definedActionDescription.
    ?odaProblem oda:createdBy ?user.
    ?user oda:userPhoneNumber ?phoneNumber.
    ?user oda:userMail ?email.
    ?user oda:userAffiliation ?affiliation.
    ?odaProblem oda:ODAprogress ?progress.
    ?odaProblem oda:approved ?approved.
    optional{
        {
        select ?odaProblem (count(?sub) as ?subCount) {
            ?sub rdf:type oda:User.
            ?odaProblem oda:hasSubscriber ?sub.
        } group by ?odaProblem
            
    }
    }
    ${filter === 1 ? 'Filter(regex(?progress, "newChallenge"))' :
    filter === 2 ? 'Filter(regex(?progress, "inProcess"))' :
      filter === 3 ? 'Filter(regex(?progress, "Solved"))' : ""}
    ${relation && email ? '?user2 oda:userMail "'.concat(email.toString(), '".') : ''}
    ${relation && +relation === 0 ? '?user2 oda:subscribedTo ?odaProblem.' : relation && +relation === 1 ? '?user2 oda:creatorOf ?odaProblem.' : ''}
    ${approved?.toString() === 'true' ? '?odaProblem oda:approved true.' : approved?.toString() === 'false' ? '?odaProblem oda:approved false.' : ''}
    Filter (regex(?title, "${searchString}") || regex(?specificProblemDescription, "${searchString}")).
    Filter (regex(?title, "${category}") || regex(?specificProblemDescription, "${category}")).
    
} limit ${limit} offset ${offset}`,
  // This one is badly designed. a better solution than using nodeName is found in getSubscribers. Simply prefix the whole id as seen in that method, so you wont have to substring the id in frontend.
  addCategories: (specProblem: string, dataProduct: string, accessibleData: string, nodeName: string) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix oda: <urn:absolute:ODA2.0#>
  delete {
    oda:${nodeName} oda:approved false.
  }
  insert {
    ?dataProduct rdf:type oda:${dataProduct}.
    ?specProblem rdf:type oda:${specProblem}.
    ?acData rdf:type oda:${accessibleData}.
    oda:${nodeName} oda:approved true.
  }
  where {
    oda:${nodeName} oda:hasSpecificProblem ?sp.
    oda:${nodeName} oda:hasAccesibleData ?ad.
    oda:${nodeName} oda:hasClearDataProduct ?dp.
    bind(?sp as ?specProblem).
    bind(?ad as ?acData).
    bind(?dp as ?dataProduct).
    
  }
  `,
  addInference: (specProblem: string, dataProduct: string, accessibleData: string, nodeName: string) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix oda: <urn:absolute:ODA2.0#>
  insert {
    ?dataProduct rdf:type oda:${dataProduct}.
    ?specProblem rdf:type oda:${specProblem}.
    ?acData rdf:type oda:${accessibleData}.
  
    ?specProblemCategory oda:sameCategoryAs ?specProblem.
    ?dataProductCategory oda:sameCategoryAs ?dataProduct.
    ?acDataCategory oda:sameCategoryAs ?acData.
    oda:${nodeName} oda:approved true.
  }
  where {
    
    ?clearDataProduct rdf:type oda:${dataProduct}.
    ?specificProblem rdf:type oda:${specProblem}.
    ?accessibleData rdf:type oda:${accessibleData}.
    Bind(?specificProblem as ?specProblemCategory).
    Bind(?clearDataProduct as ?dataProductCategory).
    Bind(?accessibleData as ?acDataCategory).
    oda:${nodeName} oda:hasSpecificProblem ?sp.
    oda:${nodeName} oda:hasAccesibleData ?ad.
    oda:${nodeName} oda:hasClearDataProduct ?dp.
    bind(?sp as ?specProblem).
    bind(?ad as ?acData).
    bind(?dp as ?dataProduct).
    }
    `,
  addUser: (phone: number, email: string, affiliation: string, password: string, setAdmin: boolean) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  insert data {
    oda:${email.replace('@', '')} rdf:type oda:User.
    oda:${email.replace('@', '')} rdf:type owl:NamedIndividual.
    oda:${email.replace('@', '')} oda:userPhoneNumber "${phone}"^^xsd:int.
    oda:${email.replace('@', '')} oda:userMail "${email}".
    oda:${email.replace('@', '')} oda:userAffiliation "${affiliation}".
    oda:${email.replace('@', '')} oda:isAdmin ${(setAdmin).toString()}.
    oda:${email.replace('@', '')} oda:userPassword "${password}".          
} `,

  findUser: (email: string, password: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  select * where {
  ?user oda:userMail "${email}".
  ?user oda:userPassword "${password}".
  }
  `,
  setAdmin: (email: string, setAdmin: boolean) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  delete {
    ?u oda:isAdmin ${(!setAdmin).toString()}.
  }
  insert  { 
    ?u oda:isAdmin ${setAdmin.toString()}.
  } where {
    ?u oda:userMail "${email}".
    bind(?u as ?user)
  }
  `,
  addODAProblem: (nodeName: string, title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, definedAction: string, supplier: string, userMail: string, status) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX oda: <urn:absolute:ODA2.0#>  
  insert {
    oda:${nodeName} rdf:type oda:ODAProblem.
    oda:${nodeName} rdf:type owl:NamedIndividual.
    
    oda:${nodeName}SpecificProblem rdf:type oda:SpecificProblem.
    oda:${nodeName}ClearDataProduct rdf:type oda:ClearDataProduct.
    oda:${nodeName}AccessibleData rdf:type oda:AccesibleData.
    oda:${nodeName}DefinedAction rdf:type oda:hasDefinedAction.
   
    oda:${nodeName}SpecificProblem rdf:type owl:NamedIndividual.
    oda:${nodeName}ClearDataProduct rdf:type owl:NamedIndividual.
    oda:${nodeName}AccessibleData rdf:type owl:NamedIndividual.
    oda:${nodeName}DefinedAction rdf:type oda:NamedIndividual.
    
    oda:${nodeName} oda:hasSpecificProblem oda:${nodeName}SpecificProblem.
    oda:${nodeName} oda:hasClearDataProduct oda:${nodeName}ClearDataProduct.
    oda:${nodeName} oda:hasAccesibleData oda:${nodeName}AccessibleData.
    oda:${nodeName} oda:hasDefinedAction oda:${nodeName}DefinedAction.
    oda:${nodeName} oda:hasVendor oda:${supplier}.
    oda:${nodeName} oda:approved false.
    oda:${nodeName} oda:ODATitle "${title}".
    oda:${nodeName} oda:ODAprogress "${status.toString()}".
    oda:${nodeName}SpecificProblem oda:specificProblemDescription "${specificProblem}".
    oda:${nodeName}ClearDataProduct oda:dataProductDescription "${clearDataProduct}".
    oda:${nodeName}AccessibleData oda:accesibleDataDescription "${accessibleData}".
    oda:${nodeName}DefinedAction oda:definedActionDescription "${definedAction}".
    oda:${nodeName} oda:createdBy ?user.
    
  }
  where {
    ?u oda:userMail "${userMail}".
    Bind(?u as ?user).
  }

`,
  updateODAProblem: (odaProblem: string, vendor: string, progress: string, title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, definedAction: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX : <urn:absolute:ODA2.0#>
  prefix problem: <${odaProblem}>

  delete {
    ?da oda:definedActionDescription ?daDescription.
    ?sp oda:specificProblemDescription ?spDescription.
    ?cdp oda:dataProductDescription ?cdpDescription.
    ?ad oda:accesibleDataDescription ?adDescription.
    ?odaProblem oda:ODATitle ?title.
    ?odaProblem oda:hasVendor ?vendor.
    ?odaProblem oda:ODAprogress ?progress.
  }
  insert {
    ?da oda:definedActionDescription "${definedAction}".
    ?sp oda:specificProblemDescription "${specificProblem}".
    ?cdp oda:dataProductDescription "${clearDataProduct}".
    ?ad oda:accesibleDataDescription "${accessibleData}".
    ?odaProblem oda:ODATitle "${title}".
    ?odaProblem oda:hasVendor oda:${vendor}.
    ?odaProblem oda:ODAprogress "${progress}".
  }
  where {
    problem: owl:sameAs ?odaProblem.
    
    ?odaProblem oda:hasDefinedAction ?da.
    ?odaProblem oda:hasSpecificProblem ?sp.
    ?odaProblem oda:hasClearDataProduct ?cdp.
    ?odaProblem oda:hasAccesibleData ?ad.
    
    ?da oda:definedActionDescription ?daDescription.
    ?sp oda:specificProblemDescription ?spDescription.
    ?cdp oda:dataProductDescription ?cdpDescription.
    ?ad oda:accesibleDataDescription ?adDescription.
    
    ?odaProblem oda:ODATitle ?title.
    ?odaProblem oda:hasVendor ?vendor.
    ?odaProblem oda:ODAprogress ?progress.
    
  }
  `,
  deleteODAProblem: (ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  delete where {
  <${ODAProblem}> ?p ?o
  }
  `,
  subscribe: (userEmail: string, ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  insert {
    ?user oda:subscribedTo <${ODAProblem}>.
  } where {
    ?u oda:userMail "${userEmail}".
    bind(?u as ?user)
  }
  `,
  unsubscribe: (userEmail: string, ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  delete {
    ?user oda:subscribedTo <${ODAProblem}>.
  } where {
    ?u oda:userMail "${userEmail}".
    bind(?u as ?user)
  }
  `,
  getUser: (userEmail: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  select * where {
    ?user oda:userMail "${userEmail}".
    ?user oda:userMail ?mail.
    ?user oda:userPhoneNumber ?phone.
    ?user oda:userAffiliation ?affiliation.
    ?user oda:isAdmin ?isAdmin
}`,
  isSubbed: (userEmail: string, ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX problem: <${ODAProblem}>
select * {
?user oda:userMail "${userEmail}".
?user oda:subscribedTo problem:.
}`,
  getSubscribers: (ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX problem: <${ODAProblem}>
  select * {
    ?user oda:subscribedTo problem:.
    ?user oda:userMail ?email.
    ?user oda:userPhoneNumber ?phone.
    ?user oda:userAffiliation ?affiliation.
}

  `,
  specProbCategories: () => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  select *  {
       ?category rdfs:subClassOf oda:SpecificProblem.   
} 
  `,
  dataProdCategories: () => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  select *  {
       ?category rdfs:subClassOf oda:ClearDataProduct.
} 
  `,
  acDataCategories: () => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  select *  {
       ?category rdfs:subClassOf oda:AccesibleData.
} 
  `,

}
