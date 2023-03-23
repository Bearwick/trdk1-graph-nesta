export default {
  // OUTDATED
  getODAProblems: (limit: number, offset: number) => `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select * where {
      ?s rdf:type <urn:absolute:ODA2.0#ODAProblem> 
  } limit ${limit} offset ${offset}`,
  addODAProblem: (nodeName: string, title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, supplier: string, userMail: string) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX oda: <urn:absolute:ODA2.0#>
  insert {
    oda:${nodeName} rdf:type oda:ODAProblem.
    
    oda:${nodeName}SpecificProblem rdf:type oda:SpecificProblem.
    oda:${nodeName}ClearDataProduct rdf:type oda:ClearDataProduct.
    oda:${nodeName}AccessibleData rdf:type oda:AccesibleData.
    
    oda:name rdf:type owl:NamedIndividual.
    oda:${nodeName}SpecificProblem rdf:type owl:NamedIndividual.
    oda:${nodeName}ClearDataProduct rdf:type owl:NamedIndividual.
    oda:${nodeName}AccessibleData rdf:type owl:NamedIndividual.
    
    oda:${nodeName} oda:hasSpecificProblem oda:${nodeName}SpecificProblem.
    oda:${nodeName} oda:hasClearDataProduct oda:${nodeName}ClearDataProduct.
    oda:${nodeName} oda:hasAccesibleData oda:${nodeName}AccessibleData.
    oda:${nodeName} oda:hasVendor oda:${supplier}.
    
    oda:${nodeName} oda:ODATitle "${title}".
    oda:${nodeName}SpecificProblem oda:specificProblemDescription "${specificProblem}".
    oda:${nodeName}ClearDataProduct oda:dataProductDescription "${clearDataProduct}".
    oda:${nodeName}AccessibleData oda:accesibleDataDescription "${accessibleData}".
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

  addUser: (name: string, phone: number, email: string, affiliation: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  insert data {
    oda:${email.replace("@", "")} rdf:type oda:User.
    oda:${email.replace("@", "")} rdf:type owl:NamedIndividual.
    oda:${email.replace("@", "")} oda:userName "${name}".
    oda:${email.replace("@", "")} oda:userPhoneNumber "${phone}"^^xsd:int.
    oda:${email.replace("@", "")} oda:userMail "${email}".
    oda:${email.replace("@", "")} oda:userAffiliation "${affiliation}".
    oda:${email.replace("@", "")} oda:isAdmin false.          
} `,
  setAdmin: (email: string, setAdmin: boolean) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  delete {
    ?u oda:isAdmin ${!setAdmin}.
  }
  insert  { 
    ?u oda:isAdmin ${setAdmin}.
  } where {
    ?u oda:userMail "${email}".
    bind(?u as ?user)
  }
  `,


}
