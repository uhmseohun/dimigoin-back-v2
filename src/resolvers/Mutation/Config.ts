import { getConfig } from '../../resources/Config';
import { IContext } from '../../interfaces/IContext';
import Auth from '../../resources/Auth';
import { ConfigModel } from '../../models';

export default {
  async setNotice(_: any, { notice }: { notice: string }, context: IContext) {
    const updateNotice = await ConfigModel.findByIdAndUpdate(
      '5e79c13d2f54140f4fa37bcb',
      {
        value: notice,
      },
    );
    return updateNotice.value;
  },
};
