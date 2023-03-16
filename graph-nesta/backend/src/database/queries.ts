export default {
  getRepositories: () =>
    `
        PREFIX%20untitled-ontology-19%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fjespb%2Fontologies%2F2023%2F1%2Funtitled-ontology-19%23%3E%20PREFIX%20untitled-ontology-24%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fjespb%2Fontologies%2F2023%2F1%2Funtitled-ontology-24%23%3E%20select%20*%20where%20%7B%20%20%09%3Fs%20%3Fp%20untitled-ontology-24%3AgoesWellWith%20%7D%20limit%20100%20 
    `,
  getODAProblems: (limit: number, offset: number) => `
    PREFIX%20untitled-ontology-24%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fjespb%2Fontologies%2F2023%2F1%2Funtitled-ontology-24%23%3E%20PREFIX%20untitled-ontology-19%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fjespb%2Fontologies%2F2023%2F1%2Funtitled-ontology-19%23%3E%20PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20select%20*%20where%20%7B%20%20%09%3Fs%20rdf%3Atype%20untitled-ontology-19%3AODAProblem%20%20%7D%20limit%20${limit}%20offset${offset}
    `,
}
