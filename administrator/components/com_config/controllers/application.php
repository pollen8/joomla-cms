<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_config
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Controller for global configuration
 *
 * @package     Joomla.Administrator
 * @subpackage  com_config
 * @since       1.5
 */
class ConfigControllerApplication extends JControllerLegacy
{
	/**
	 * Class Constructor
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @return  void
	 *
	 * @since   1.5
	 */
	public function __construct($config = array())
	{
		parent::__construct($config);

		// Map the apply task to the save method.
		$this->registerTask('apply', 'save');
	}

	/**
	 * Method to save the configuration.
	 *
	 * @return  bool  True on success, false on failure.
	 *
	 * @since   1.5
	 */
	public function save()
	{
		// Check for request forgeries.
		JSession::checkToken() or jexit(JText::_('JINVALID_TOKEN'));

		// Check if the user is authorized to do this.
		if (!JFactory::getUser()->authorise('core.admin'))
		{
			JFactory::getApplication()->redirect('index.php', JText::_('JERROR_ALERTNOAUTHOR'));
			return;
		}

		// Set FTP credentials, if given.
		JClientHelper::setCredentialsFromRequest('ftp');

		$app = JFactory::getApplication();
		$model = $this->getModel('Application');
		$form = $model->getForm();
		$data = $this->input->post->get('jform', array(), 'array');

		// Validate the posted data.
		$return = $model->validate($form, $data);

		// Check for validation errors.
		if ($return === false)
		{
			// Get the validation messages.
			$errors = $model->getErrors();

			// Push up to three validation messages out to the user.
			for ($i = 0, $n = count($errors); $i < $n && $i < 3; $i++)
			{
				if ($errors[$i] instanceof Exception)
				{
					$app->enqueueMessage($errors[$i]->getMessage(), 'warning');
				}
				else
				{
					$app->enqueueMessage($errors[$i], 'warning');
				}
			}

			// Save the data in the session.
			$app->setUserState('com_config.config.global.data', $data);

			// Redirect back to the edit screen.
			$this->setRedirect(JRoute::_('index.php?option=com_config&view=application', false));
			return false;
		}

		// Attempt to save the configuration.
		$data = $return;
		$return = $model->save($data);

		// Check the return value.
		if ($return === false)
		{
			// Save the data in the session.
			$app->setUserState('com_config.config.global.data', $data);

			// Save failed, go back to the screen and display a notice.
			$message = JText::sprintf('JERROR_SAVE_FAILED', $model->getError());
			$this->setRedirect('index.php?option=com_config&view=application', $message, 'error');
			return false;
		}

		// Set the success message.
		$message = JText::_('COM_CONFIG_SAVE_SUCCESS');

		// Set the redirect based on the task.
		switch ($this->getTask())
		{
			case 'apply':
				$this->setRedirect('index.php?option=com_config', $message);
				break;

			case 'save':
			default:
				$this->setRedirect('index.php', $message);
				break;
		}

		return true;
	}

	/**
	 * Cancel operation
	 */
	public function cancel()
	{
		// Check if the user is authorized to do this.
		if (!JFactory::getUser()->authorise('core.admin', 'com_config'))
		{
			JFactory::getApplication()->redirect('index.php', JText::_('JERROR_ALERTNOAUTHOR'));
			return;
		}

		// Set FTP credentials, if given
		JClientHelper::setCredentialsFromRequest('ftp');

		// Clean the session data.
		$app = JFactory::getApplication();
		$app->setUserState('com_config.config.global.data', null);

		$this->setRedirect('index.php');
	}

	public function refreshHelp()
	{
		jimport('joomla.filesystem.file');

		// Set FTP credentials, if given
		JClientHelper::setCredentialsFromRequest('ftp');

		if (($data = file_get_contents('http://help.joomla.org/helpsites.xml')) === false)
		{
			$this->setRedirect('index.php?option=com_config', JText::_('COM_CONFIG_ERROR_HELPREFRESH_FETCH'), 'error');
		}
		elseif (!JFile::write(JPATH_BASE . '/help/helpsites.xml', $data))
		{
			$this->setRedirect('index.php?option=com_config', JText::_('COM_CONFIG_ERROR_HELPREFRESH_ERROR_STORE'), 'error');
		}
		else
		{
			$this->setRedirect('index.php?option=com_config', JText::_('COM_CONFIG_HELPREFRESH_SUCCESS'));
		}

		if ($this->input->get('format') == 'json')
		{
			$options = JHelp::createSiteList(JPATH_ADMINISTRATOR . '/help/helpsites.xml');
			echo json_encode($options);
			JFactory::getApplication()->close();
		}
	}

	/**
	 * Method to remove the root property from the configuration.
	 *
	 * @return  bool  True on success, false on failure.
	 *
	 * @since   1.5
	 */
	public function removeroot()
	{
		// Check for request forgeries.
		JSession::checkToken('get') or die('Invalid Token');

		// Check if the user is authorized to do this.
		if (!JFactory::getUser()->authorise('core.admin'))
		{
			JFactory::getApplication()->redirect('index.php', JText::_('JERROR_ALERTNOAUTHOR'));
			return;
		}

		// Initialise model.
		$model = $this->getModel('Application');

		// Attempt to save the configuration and remove root.
		$return = $model->removeroot();

		// Check the return value.
		if ($return === false)
		{
			// Save failed, go back to the screen and display a notice.
			$this->setMessage(JText::sprintf('JERROR_SAVE_FAILED', $model->getError()), 'error');
			$this->setRedirect('index.php');
			return false;
		}

		// Set the success message.
		$message = JText::_('COM_CONFIG_SAVE_SUCCESS');

		// Set the redirect based on the task.
		$this->setRedirect('index.php', $message);

		return true;
	}
}
