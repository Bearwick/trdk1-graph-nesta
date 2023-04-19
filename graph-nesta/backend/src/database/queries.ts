export default {
  // OUTDATED
  getODAProblems: (limit: number, offset: number, searchString: string, category: string, email?: string, relation?: number) => `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX oda: <urn:absolute:ODA2.0#>
  select * where {
    ?odaProblem rdf:type oda:ODAProblem.
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
    ${relation && email ? '?user2 oda:userMail "'.concat(email.toString(), '".'): ""}
    ${relation && +relation === 0 ? '?user2 oda:subscribedTo ?odaProblem.': relation && +relation === 1 ? '?user2 oda:creatorOf ?odaProblem.': ""}
    
    Filter (regex(?title, "${searchString}") || regex(?specificProblemDescription, "${searchString}")).
    Filter (regex(?title, "${category}") || regex(?specificProblemDescription, "${category}")).
    
} limit ${limit} offset ${offset}`,
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
    
    oda:${nodeName} oda:ODATitle "${title}".
    oda:${nodeName} oda:ODAprogress "${status}".
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
  addCategories: (specProblem: string, dataProduct: string, accessibleData: string, nodeName: string) => `
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
    oda:${email.replace("@", "")} rdf:type oda:User.
    oda:${email.replace("@", "")} rdf:type owl:NamedIndividual.
    oda:${email.replace("@", "")} oda:userPhoneNumber "${phone}"^^xsd:int.
    oda:${email.replace("@", "")} oda:userMail "${email}".
    oda:${email.replace("@", "")} oda:userAffiliation "${affiliation}".
    oda:${email.replace("@", "")} oda:isAdmin ${(setAdmin).toString()}.
    oda:${email.replace("@", "")} oda:userPassword "${password}".          
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
  `


}
