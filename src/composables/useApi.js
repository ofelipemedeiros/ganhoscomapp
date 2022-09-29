
import { isDate } from '@vue/shared'
import { date } from 'quasar'
import useSupabase from 'src/boot/supabase'
import { getCurrentInstance } from 'vue'
import useAuthUser from './useAuthUser'
export default function useApi() {
  const { supabase } = useSupabase()
  const { user } = useAuthUser()
  const usuario = user.value.id




  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', `${usuario}`)
    if (error) throw error
    return data
  }
  const listReceitas = async (table) => {

    const d = new Date()
    //const d2 = new Date()
    //d.setDate(d.getDate() -1)
    //d2.setDate(d2.getDate() + 7)
    //const date = d.toLocaleDateString(d)
    // const dt = d.toLocaleDateString()
     //const dmsete = d2.toLocaleDateString(d2)
    const d5 = d.toISOString().substring(0, 10)
    const { data, error } = await supabase.from(table)
      .select(`data_receitas, valor_receitas,fk_tipo_receita,fk_app, tipo_receitas (nome_tipo_receita), aplicativos(nome_app)`)
      .order('data_receitas', { ascending: false })
      .gte('data_receitas', d5)
    if (error) throw error
    return data
  }

  const list7dias = async (table) => {
    const d = new Date()
    d.setDate(d.getDate() - 7)
    const d5 = d.toISOString(d).substring(0, 10)
    const { data, error } = await supabase.from(table)
      .select(`data_receitas, valor_receitas,fk_tipo_receita,fk_app, tipo_receitas (nome_tipo_receita), aplicativos(nome_app)`)
      .order('data_receitas', { ascending: false })
      .gte('data_receitas', d5)


    if (error) throw error
    return data
  }

  const list30dias = async (table) => {
    const d = new Date()
    d.setDate(d.getDate() - 30)
    const d5 = d.toISOString(d).substring(0, 10)
    const { data, error } = await supabase.from(table)
      .select(`data_receitas, valor_receitas,fk_tipo_receita,fk_app, tipo_receitas (nome_tipo_receita), aplicativos(nome_app)`)
      .order('data_receitas', { ascending: false })
      .gte('data_receitas', d5)


    if (error) throw error
    return data
  }

  const todoPeriodo = async (table) => {
    const { data, error } = await supabase.from(table)
      .select(`data_receitas, valor_receitas,fk_tipo_receita,fk_app, tipo_receitas (nome_tipo_receita), aplicativos(nome_app)`)
      .order('data_receitas', { ascending: false })
    if (error) throw error
    return data
  }




  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data[0]


  }


  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([{
        ...form,
        user_id: user.value.id
      }])
    if (error) throw error
    return data
  }


  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update([
        ...form
      ])
      .match({ id: form.id })
    if (error) throw error
    return data

  }


  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id: id })
    if (error) throw error
    return data

  }


  return {
    list,
    list7dias,
    list30dias,
    todoPeriodo,
    getById,
    post,
    update,
    remove,
    usuario,
    listReceitas
  }
}
