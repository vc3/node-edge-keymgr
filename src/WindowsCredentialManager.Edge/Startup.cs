using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;
using Simple.CredentialManager;

/*
 * These methods must be async tasks, even though they execute syncronously.
 */
#pragma warning disable 1998

namespace WindowsCredentialManager.Edge
{
	public class Startup
	{
		/// <summary>
		/// Get a credential for the given target from the credential store.
		/// </summary>
		public async Task<object> GetCredential(object input)
		{
			if (input == null)
				throw new ArgumentNullException("input");

			if (!(input is string))
				throw new ArgumentException("Argument \'input\' must be of type string.", "input");

			var credential = new Credential {Target = (string) input};

			if (!credential.Exists())
				return null;

			if (!credential.Load())
				return null;

			return credential;
		}

		/// <summary>
		/// Add the given credential to the credential store.
		/// </summary>
		public async Task<object> AddCredential(ExpandoObject input)
		{
			var obj = (IDictionary<string, object>) input;

			if (!obj.ContainsKey("target"))
				throw new ArgumentException("Argument 'input' requires a \"target\" property.");
			if (!obj.ContainsKey("username"))
				throw new ArgumentException("Argument 'input' requires a \"username\" property.");
			if (!obj.ContainsKey("password"))
				throw new ArgumentException("Argument 'input' requires a \"password\" property.");

			var target = (string) obj["target"];
			var username = (string) obj["username"];
			var password = (string) obj["password"];

			var credential = new Credential {Target = target, PersistenceType = PersistenceType.LocalComputer};
			if (credential.Exists())
				return false;

			credential.Type = CredentialType.Generic;

			credential.Username = username;
			credential.Password = password;

			return credential.Save();
		}

		/// <summary>
		/// Remove the given credential from the credential store.
		/// </summary>
		public async Task<object> RemoveCredential(object input)
		{
			if (input == null)
				throw new ArgumentNullException("input");

			if (!(input is string))
				throw new ArgumentException("Argument \'input\' must be of type string.", "input");

			var credential = new Credential {Target = (string) input};

			return credential.Delete();
		}
	}
}
