import { MessageType } from '../common/message.type';

export class NotificationMessageData {
  titulo: string;
  message?: string;
  tipo?: MessageType;
}

export class NotificationMessageDialogData {
  titulo: string;
  mensagem: string;
  okButtonTitle?: string = 'Ok';
  noButtonTitle?: string = 'No';
  showNoButton?: boolean = false;
}
