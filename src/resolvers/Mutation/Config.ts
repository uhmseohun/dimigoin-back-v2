import { getConfig } from '../../resources/Config';
import { IContext } from '../../interfaces/IContext';
import Auth from '../../resources/Auth';
import { ConfigModel } from '../../models';

export default {
  async setNotice(_: any, { notice }: { notice: string }, context: IContext) {
    const updateNotice = await ConfigModel.findByKeyAndUpdate('NOTICE', notice)
    return updateNotice.value;
  },
};
