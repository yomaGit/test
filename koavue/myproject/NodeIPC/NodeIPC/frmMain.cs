using System;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace NodeIPC
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

        private const string PIPE_NAME = "salamander_pipe";

        private void btnStartListen_Click(object sender, EventArgs e)
        {
            Task.Factory.StartNew(StartListen);
        }

        private void StartListen()
        {
            for (;;)
            {
                using (NamedPipeServerStream pipeServer =
                    new NamedPipeServerStream(PIPE_NAME, PipeDirection.InOut, 1))
                {
                    try
                    {
                        pipeServer.WaitForConnection();
                        pipeServer.ReadMode = PipeTransmissionMode.Byte;
                        using (StreamReader sr = new StreamReader(pipeServer))
                        {
                            string message = sr.ReadToEnd();
                            txtMessage.Invoke(new EventHandler(delegate
                            {
                                txtMessage.AppendText(message + "\n");
                            }));
                        }
                    }
                    catch (IOException ex)
                    {
                        MessageBox.Show("监听管道失败：" + ex.Message);
                    }
                }
            }
        }
    }
}
