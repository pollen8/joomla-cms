<?php
/**
 * @package	    Joomla.UnitTest
 * @subpackage  HTML
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license	    GNU General Public License version 2 or later; see LICENSE
 */

/**
 * Test class for JHtmlBatch.
 * Generated by PHPUnit on 2012-07-26 at 20:30:20.
 */
class JHtmlBatchTest extends TestCaseDatabase
{
	/**
	 * @var JHtmlBatch
	 */
	protected $object;

	/**
	 * Sets up the fixture, for example, opens a network connection.
	 * This method is called before a test is executed.
	 */
	protected function setUp()
	{
		parent::setUp();
	}

	/**
	 * Tears down the fixture, for example, closes a network connection.
	 * This method is called after a test is executed.
	 */
	protected function tearDown()
	{
	}

	/**
	 * Gets the data set to be loaded into the database during setup
	 */
	protected function getDataSet()
	{
		return $this->createXMLDataSet(__DIR__ . '/data/JHtmlTest.xml');
	}

	/**
	 * Tests the access method.
	 */
	public function testAccess()
	{
		$this->assertThat(
			JHtmlBatch::access(),
			$this->StringContains('<option value="1">Public</option>')
		);
	}

	/**
	 * Tests the item method.
	 */
	public function testItem()
	{
		$this->assertThat(
			JHtmlBatch::item('com_content'),
			$this->StringContains('<option value="2">Uncategorised</option>')
		);
	}

	/**
	 * Tests the language method.
	 */
	public function testLanguage()
	{
		$this->assertThat(
			JHtmlBatch::language(),
			$this->StringContains('<option value="en-GB">English (UK)</option>')
		);
	}

	/**
	 * Tests the user method.
	 */
	public function testUser()
	{
		$this->assertThat(
			JHtmlBatch::user(true),
			$this->StringContains('<option value="42">Super User</option>')
		);
	}
}
