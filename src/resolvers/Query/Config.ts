import { getConfig } from "../../resources/Config"

export default {
    async notice() {
        const config = await getConfig();
        return config['NOTICE']
    }
}
