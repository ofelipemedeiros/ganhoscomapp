
import useSupabase from 'src/boot/supabase'
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
  const { data, error } = await supabase.from(table).select(`data_receitas, valor_receitas,fk_tipo_receita,fk_app, tipo_receitas (nome_tipo_receita), aplicativos(nome_app)`)
  if(error) throw error
  return data
  }

  // const listReceitas = async (table) => {
  //   const { data, error } = await supabase.from(table).select(`
  //   data_receitas,valor_receitas, tipo_receita fk_tipo_receita,
  //   tipo_receitas (

  //     id_tipo_receita

  //   )
  // `)
  // if(error) throw error
  // return data
  // }


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
    getById,
    post,
    update,
    remove,
    usuario,
    listReceitas
  }
}
