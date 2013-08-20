<?php
/**
 * Display a json loaded window with a repeatble set of sub fields
 *
 * @package     Joomla
 * @subpackage  Form
 * @copyright   Copyright (C) 2005-2013 fabrikar.com - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

/**
 * Display a json loaded window with a repeatable set of sub fields
 *
 * @package     Joomla
 * @subpackage  Form
 * @since       1.6
 */

class JFormFieldRepeatable extends JFormField
{
	/**
	 * The form field type.
	 *
	 * @var		string
	 * @since	1.6
	 */
	protected $type = 'Repeatable';

	/**
	 * Method to get the field input markup.
	 *
	 * @since	1.6
	 *
	 * @return	string	The field input markup.
	 */

	protected function getInput()
	{
		// Initialize variables.
		$app = JFactory::getApplication();
		$document = JFactory::getDocument();
		JHtml::stylesheet('administrator/components/com_fabrik/views/fabrikadmin.css');
		$subForm = new JForm($this->name, array('control' => 'jform'));
		$xml = $this->element->children()->asXML();
		$subForm->load($xml);

		// Needed for repeating modals in gmaps viz
		$subForm->repeatCounter = (int) @$this->form->repeatCounter;
		$input = $app->input;
		$children = $this->element->children();

		$subForm->setFields($children);

		$str = array();
		$modalid = $this->id . '_modal';

		$str[] = '<div id="' . $modalid . '" style="display:none">';
		$str[] = '<table class="adminlist ' . $this->element['class'] . ' table table-striped">';
		$str[] = '<thead><tr>';
		$names = array();
		$attributes = $this->element->attributes();

		foreach ($subForm->getFieldset($attributes->name . '_modal') as $field)
		{
			$names[] = (string) $field->element->attributes()->name;
			$str[] = '<th>' . strip_tags($field->getLabel($field->name));
			$str[] = '<br /><small style="font-weight:normal">' . JText::_($field->description) . '</small>';
			$str[] = '</th>';
		}

		$str[] = '<th><a href="#" class="add btn button btn-success"><span class="icon-plus"></span> </a></th>';
		$str[] = '</tr></thead>';
		$str[] = '<tbody><tr>';

		foreach ($subForm->getFieldset($attributes->name . '_modal') as $field)
		{
			$str[] = '<td>' . $field->getInput() . '</td>';
		}

		$str[] = '<td>';
		$str[] = '<div class="btn-group"><a class="add btn button btn-success"><span class="icon-plus"></span> </a>';
		$str[] = '<a class="remove btn button btn-danger"><span class="icon-minus"></span> </a></div>';
		$str[] = '</td>';
		$str[] = '</tr></tbody>';
		$str[] = '</table>';
		$str[] = '</div>';

		$names = json_encode($names);

		JHTML::_('script', 'system/repeatable.js', true, true);

		$script = "(function ($){
			$(document).ready(function (){
				var repeatable = new $.JRepeatable('$modalid', $names, '$this->id');
			});
		})(jQuery);";

		$document = JFactory::getDocument();
		$document->addScriptDeclaration($script);

		$icon = $this->element['icon'] ? '<i class="icon-' . $this->element['icon'] . '"></i> ' : '';
		$str[] = '<button class="btn" id="' . $modalid . '_button" data-modal="' . $modalid . '">' . $icon . JText::_('JLIB_FORM_BUTTON_SELECT') . '</button>';

		if (is_array($this->value))
		{
			$this->value = array_shift($this->value);
		}
		$value = htmlspecialchars($this->value, ENT_COMPAT, 'UTF-8');
		$str[] = '<input type="" name="' . $this->name . '" id="' . $this->id . '" value="' . $value . '" />';

		JText::script('JAPPLY');
		JText::script('JCANCEL');
		return implode("\n", $str);
	}

}
