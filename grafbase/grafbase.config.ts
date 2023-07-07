import { g, auth, config } from '@grafbase/sdk'

// Modelo para el User

// @ts-ignore  -> ignora el complain de typescript
const User = g.model('User', {
  name: g.string().length({min: 2, max: 20}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({min: 10}).optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(() => Project).list().optional(), // list() -> lista de projectos

}).auth((rules) => {
  rules.public().read()
})

// @ts-ignore  -> ignora el complain de typescript
const Project = g.model('Project', {
  title: g.string().length({min:3}),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(), // search() permite usar la búsqueda
  createdBy: g.relation(() => User)
}).auth((rules) => {
  rules.public().read(),
  rules.private().create().delete().update()
})

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
})
export default config({
  schema: g,
  auth: {
    providers:[jwt],
    rules: (rules) => rules.private(),
  }
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
