import { useGlobalSearchParams } from "expo-router"
import { Text } from "react-native"
import { useQuery } from "react-query"
import blogs from "../../services/blogs"

const Motive = () =>{
    const params = useGlobalSearchParams()
    const {data} = useQuery("blog",blogs.getAll)
    const motive = data.filter(())
    return(<Text>Help me</Text>)
}

export default Motive